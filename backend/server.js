const express = require("express");
const path = require("path");
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const flash = require("express-flash");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const fetch = require('node-fetch');
const { saveOrUpdateUserWithMicrosoftInfo } = require('./userService');

const app = express();
const PORT = process.env.PORT || 4000;

const initializePassport = require("./passportConfig");
initializePassport(passport);

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.userId = decoded.userId; // Assign directly to req
            req.accessToken = decoded.accessToken;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized if no token
    }
};


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); 

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Ensures the cookie is only sent over HTTPS
            sameSite: 'None', // Allows cross-site cookies for third-party use
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.post('/users/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
            if (err) {
                console.error("Error querying database:", err);
                return res.status(500).json({ message: "Server error" });
            }

            if (results.rows.length > 0) {
                const user = results.rows[0];

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.error("Error comparing passwords:", err);
                        return res.status(500).json({ message: "Server error" });
                    }

                    if (isMatch) {
                        const token = jwt.sign(
                            { 
                                userId: user.id, 
                                firstName: user.firstname, 
                                lastName: user.lastname, 
                                email: user.email, 
                                phone: user.phone, 
                                role: user.role,
                                goal: user.goal,
                                picture: user.picture,
                            }, 
                            process.env.JWT_SECRET, 
                            { expiresIn: "1h" }
                        );

                        res.json({
                            message: "Login successful",
                            token: token,
                        });

                    } else {
                        res.status(401).json({ message: "Password incorrect" });
                    }
                });
            } else {
                res.status(401).json({ message: "No user found with this email" });
            }
        });
    } catch (error) {
        console.error("Server error during login:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/users/register", async (req, res) => {
    const { firstName, lastName, email, phone, role, password, password2, microsoft_id, accessToken } = req.body;
    let errors = [];

    if (!firstName || !lastName || !email || !password || !password2 || !role || !phone || !microsoft_id || !accessToken) {
        errors.push({ message: "Please enter all fields" });
    }

    if (password.length < 6) {
        errors.push({ message: "Password must be at least 6 characters long" });
    }

    if (password !== password2) {
        errors.push({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const defaultPicture = "https://via.placeholder.com/100";

    pool.query(`SELECT * FROM users WHERE email = $1`, [email], (err, results) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (results.rows.length > 0) {
            return res.status(400).json({ message: "User with that email already exists" });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.status(500).json({ message: "Server error" });
                }

                pool.query(
                    `INSERT INTO users (firstName, lastName, email, phone, role, password, picture, microsoft_id, access_token) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                    RETURNING id, firstName, lastName, email, phone, role, picture, microsoft_id, access_token`,
                    [firstName, lastName, email, phone, role, hash, defaultPicture, microsoft_id, accessToken],
                    (err, result) => {
                        if (err) {
                            console.error("Error inserting new user:", err);
                            return res.status(500).json({ message: "Server error" });
                        }
                        res.status(201).json({ message: "User registered successfully", user: result.rows[0] });
                    }
                );
            });
        }
    });
});

app.post("/users/update-profile", upload.single("profilePicture"), authenticateJWT, async (req, res) => {
    const { firstName, lastName, phone, goal } = req.body;
    const userId = req.userId; // Access the user ID directly from req.userId

    try {
        // Fetch the current user from the database
        const result = await pool.query("SELECT picture FROM users WHERE id = $1", [userId]);
        const currentUser = result.rows[0];

        // Use the existing picture if no new one is uploaded
        const profilePicturePath = req.file ? req.file.path : currentUser.picture || "https://via.placeholder.com/100";

        // Update the user's data in the database
        const updateResult = await pool.query(
            `UPDATE users SET firstName = $1, lastName = $2, phone = $3, goal = $4, picture = $5 WHERE id = $6 RETURNING *`,
            [firstName, lastName, phone, goal, profilePicturePath, userId]
        );

        const updatedUser = updateResult.rows[0];

        // Generate a new token with updated user information
        const newToken = jwt.sign(
            {
                userId: updatedUser.id,
                firstName: updatedUser.firstname,
                lastName: updatedUser.lastname,
                email: updatedUser.email,
                phone: updatedUser.phone,
                goal: updatedUser.goal,
                picture: updatedUser.picture,
                role: updatedUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser, token: newToken });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Serve the React app for any other routes
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
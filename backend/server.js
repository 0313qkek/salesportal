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

const app = express();
const PORT = process.env.PORT || 4000;

const initializePassport = require("./passportConfig");
initializePassport(passport);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); 

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(path.join(__dirname, "../frontend/build")));

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
                                role: user.role 
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
    const { firstName, lastName, email, phone, role, password, password2 } = req.body;
    let errors = [];

    if (!firstName || !lastName || !email || !password || !password2 || !role || !phone) {
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

    // Check if user already exists
    pool.query(`SELECT * FROM users WHERE email =$1`, [email], (err, results) => {
        if (err) {
            console.error("Error querying database for existing user:", err);
            return res.status(500).json({ message: "Server error" });
        }

        if (results.rows.length > 0) {
            return res.status(400).json({ message: "User with that email already exists" });
        } else {
            // Hash password and insert new user
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.status(500).json({ message: "Server error" });
                }

                pool.query(
                    `INSERT INTO users (firstName, lastName, email, phone, role, password) 
                    VALUES ($1, $2, $3, $4, $5, $6) 
                    RETURNING id, firstName, lastName, email, phone, role`,
                    [firstName, lastName, email, phone, role, hash],
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

// Serve the React app for any other routes
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
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
            if (err) throw err;

            if (results.rows.length > 0) {
                const user = results.rows[0];

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        const token = jwt.sign({ userId: user.id, name: user.name, email: user.email, phone: user.phone }, process.env.JWT_SECRET, {
                            expiresIn: "1h",
                        });

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
        res.status(500).json({ message: "Server error"});
    }
});

app.post("/users/register", async (req, res) => {
    const { name, email, phone, password, password2 } = req.body;

    let errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ message: "Please enter all fields"});
    }

    if (password.length < 6) {
        errors.push({ message: "Password must be at least 6 characters long"});
    }

    if (password !== password2) {
        errors.push({ message: "Passwords do not match"});
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {

    } catch (error) {

    }
});

// Serve the React app for any other routes
app.get("/", (req, res) => {
    res.send("Welcome to the Bunchful Sales Portal API");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
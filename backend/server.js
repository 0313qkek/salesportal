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
const { msalConfig, REDIRECT_URI } = require('./authConfig');
const { ConfidentialClientApplication } = require('@azure/msal-node');
const authRoutes = require('./routes/authRoutes');
const https = require('https');
const fs = require('fs');

const key = fs.readFileSync('server.key'); // Path to private key
const cert = fs.readFileSync('server.cert'); // Path to certificate

const options = { key, cert };

const msalClient = new ConfidentialClientApplication(msalConfig);
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
                console.error("JWT verification failed:", err.message);
                return res.status(403).json({ error: "Forbidden" });
            }
            req.userId = decoded.userId;
            req.accessToken = decoded.accessToken;
            next();
        });
    } else {
        console.warn("No token provided");
        res.status(401).json({ error: "Unauthorized" });
    }
};

app.use('/auth', authRoutes);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors()); 

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
        }
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
                            { expiresIn: "12h" }
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
                    `INSERT INTO users (firstName, lastName, email, phone, role, password, picture) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7) 
                    RETURNING id, firstName, lastName, email, phone, role, picture`,
                    [firstName, lastName, email, phone, role, hash, defaultPicture],
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
        let query, params;

        // Determine whether userId is an integer (id) or UUID (microsoft_id)
        if (/^\d+$/.test(userId)) {
            // If userId is numeric, it's an `id` (integer)
            query = `SELECT picture FROM users WHERE id = $1`;
            params = [parseInt(userId, 10)];
        } else {
            // Otherwise, userId is a `microsoft_id` (UUID)
            query = `SELECT picture FROM users WHERE microsoft_id = $1`;
            params = [userId];
        }

        // Fetch the current user from the database
        const result = await pool.query(query, params);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const currentUser = result.rows[0];

        // Use the existing picture if no new one is uploaded
        const profilePicturePath = req.file ? req.file.path : currentUser.picture || "https://via.placeholder.com/100";

        // Prepare the update query
        if (/^\d+$/.test(userId)) {
            // Update by `id` (integer)
            query = `
                UPDATE users 
                SET firstName = $1, lastName = $2, phone = $3, goal = $4, picture = $5 
                WHERE id = $6 
                RETURNING *`;
            params = [firstName, lastName, phone, goal, profilePicturePath, parseInt(userId, 10)];
        } else {
            // Update by `microsoft_id` (UUID)
            query = `
                UPDATE users 
                SET firstName = $1, lastName = $2, phone = $3, goal = $4, picture = $5 
                WHERE microsoft_id = $6 
                RETURNING *`;
            params = [firstName, lastName, phone, goal, profilePicturePath, userId];
        }

        // Update the user's data in the database
        const updateResult = await pool.query(query, params);

        if (updateResult.rows.length === 0) {
            return res.status(500).json({ message: "Failed to update profile" });
        }

        const updatedUser = updateResult.rows[0];

        // Generate a new token with updated user information
        const newToken = jwt.sign(
            {
                userId: updatedUser.id || updatedUser.microsoft_id,
                firstName: updatedUser.firstname,
                lastName: updatedUser.lastname,
                email: updatedUser.email,
                phone: updatedUser.phone,
                goal: updatedUser.goal,
                picture: updatedUser.picture,
                role: updatedUser.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        res.status(200).json({ message: "Profile updated successfully", user: updatedUser, token: newToken });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.get('/users/details', authenticateJWT, async (req, res) => {
    try {
        const userId = req.userId; // Can be `id` (integer) or `microsoft_id` (UUID)
        console.log("Fetching user details for:", userId);

        let query, params;

        // Check if `userId` is an integer (database `id`) or a UUID (`microsoft_id`)
        if (/^\d+$/.test(userId)) {
            // Numeric `userId` -> Treat as `id`
            query = `
                SELECT id, firstname, lastname, email, phone, role, goal, picture 
                FROM users 
                WHERE id = $1
            `;
            params = [parseInt(userId, 10)];
        } else {
            // UUID `userId` -> Treat as `microsoft_id`
            query = `
                SELECT id, firstname, lastname, email, phone, role, goal, picture 
                FROM users 
                WHERE microsoft_id = $1
            `;
            params = [userId];
        }

        const result = await pool.query(query, params);

        if (result.rows.length === 0) {
            console.warn("User not found for identifier:", userId);
            return res.status(404).json({ error: "User not found" });
        }

        const user = result.rows[0];

        // Respond with the user details
        res.status(200).json({
            id: user.id,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            goal: user.goal,
            picture: user.picture,
        });
    } catch (err) {
        console.error("Error fetching user details:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Microsoft Authentication
app.get('/auth/microsoft', async (req, res) => {
    try {
        const authUrl = await msalClient.getAuthCodeUrl({
            scopes: ['User.Read', 'Calendars.Read', 'Calendars.Read.Shared', 'Calendars.ReadBasic', 'Calendars.ReadWrite', 'Calendars.ReadWrite.Shared'],
            redirectUri: REDIRECT_URI,
        });
        res.redirect(authUrl);
    } catch (err) {
        console.error('Error generating auth URL:', err);
        res.status(500).send('Error generating auth URL.');
    }
});

app.get('/auth/microsoft/callback', async (req, res) => {
    try {
        const code = req.query.code; // Extract the authorization code
        if (!code) {
            throw new Error("Authorization code not found");
        }

        const tokenResponse = await msalClient.acquireTokenByCode({
            code: code,
            redirectUri: REDIRECT_URI,
            scopes: ['User.Read', 'Calendars.Read', 'Calendars.Read.Shared', 'Calendars.ReadBasic', 'Calendars.ReadWrite', 'Calendars.ReadWrite.Shared'],
        });

        const { accessToken, refreshToken, idTokenClaims } = tokenResponse;
        const microsoftId = idTokenClaims.oid;
        const email = idTokenClaims.preferred_username;

        // Check if the user already exists
        const existingUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (existingUser.rows.length > 0) {
            // Update existing user
            await pool.query(
                `UPDATE users SET microsoft_id = $1, access_token = $2, refresh_token = $3 WHERE email = $4`,
                [microsoftId, accessToken, refreshToken, email]
            );
            console.log(`Updated user: ${email}`);
        } else {
            // Insert new user
            await pool.query(
                `INSERT INTO users (microsoft_id, email, access_token, refresh_token) VALUES ($1, $2, $3, $4)`,
                [microsoftId, email, accessToken, refreshToken]
            );
            console.log(`Inserted new user: ${email}`);
        }

        // Generate a JWT for the user
        const token = jwt.sign(
            { userId: microsoftId, email, accessToken },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.redirect(`https://localhost:4000/home?token=${token}`);
    } catch (error) {
        console.error("Error during Microsoft callback:", error);
        res.status(500).send("Authentication error.");
    }
});


// Refresh Token Endpoint
app.post('/refresh-token', async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: "Refresh token is required" });

    try {
        const tokenResponse = await msalClient.acquireTokenByRefreshToken({
            refreshToken: refreshToken,
            scopes: ['User.Read', 'Calendars.Read', 'Calendars.Read.Shared', 'Calendars.ReadBasic', 'Calendars.ReadWrite', 'Calendars.ReadWrite.Shared'],
        });

        res.json({ accessToken: tokenResponse.accessToken });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(500).json({ error: "Failed to refresh token" });
    }
});

// Check Microsoft Connection
app.get('/users/check-connection', authenticateJWT, async (req, res) => {
    try {
        console.log("Checking Microsoft connection for user:", req.userId);
        
        // Use the `microsoft_id` column for UUID-based lookups
        const result = await pool.query(
            `SELECT microsoft_id FROM users WHERE microsoft_id = $1`,
            [req.userId]
        );

        res.json({ connected: !!result.rows[0]?.microsoft_id });
    } catch (err) {
        console.error("Error checking Microsoft connection:", err);
        res.status(500).json({ error: "Error checking connection" });
    }
});

// Fetch Calendar Events
app.get('/calendar', authenticateJWT, async (req, res) => {
    try {
        const result = await pool.query(`SELECT access_token FROM users WHERE microsoft_id = $1`, [req.userId]);
        const accessToken = result.rows[0]?.access_token;

        if (!accessToken) return res.status(404).json({ error: "Access token not found." });

        const currentYear = new Date().getUTCFullYear();
        const startYear = currentYear; // Start year for the range
        const endYear = currentYear + 1; // End year for the range
        const allEvents = [];
        
        for (let year = startYear; year <= endYear; year++) {
            for (let month = 0; month < 12; month++) {
                const startDate = new Date(Date.UTC(year, month, 1)).toISOString();
                const endDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59)).toISOString();

                let nextLink = `https://graph.microsoft.com/v1.0/me/calendarview?startDateTime=${startDate}&endDateTime=${endDate}&$select=subject,body,bodyPreview,organizer,attendees,start,end,location`;
                
                while (nextLink) {
                    const calendarResponse = await fetch(nextLink, {
                        headers: { 
                            Authorization: `Bearer ${accessToken}`,
                            Prefer: 'outlook.timezone="Eastern Standard Time"',
                        },
                    });

                    if (!calendarResponse.ok) {
                        const errorBody = await calendarResponse.text();
                        console.error("API Error:", errorBody);
                        throw new Error("Failed to fetch calendar events");
                    }

                    const calendarData = await calendarResponse.json();
                    allEvents.push(...calendarData.value);

                    nextLink = calendarData["@odata.nextLink"] || null; // Get the next page link
                }
            }
        }

        res.json(allEvents);
    } catch (err) {
        console.error("Error fetching calendar:", err);
        res.status(500).json({ error: "Error fetching calendar data" });
    }
});

// Serve the React app for any other routes
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

// Start the server
https.createServer(options, app).listen(PORT, () => {
    console.log(`Secure server running on https://localhost:${PORT}`);
});
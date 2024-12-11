const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const { OIDCStrategy } = require("passport-azure-ad");
const { saveOrUpdateUserWithMicrosoftInfo } = require("./userService.js");

function initialize(passport) {
    // Local authentication strategy
    const authenticateUser = (email, password, done) => {
        pool.query(
            `SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
                if (error) { throw error; }

                // Check if user exists in the database
                if (results.rows.length > 0) {
                    const user = results.rows[0];

                    // Compare the provided password with the stored hashed password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            console.log(err);
                        }

                        if (isMatch) {
                            // If passwords match, authentication is successful
                            return done(null, user);
                        } else {
                            // If passwords do not match, return an error message
                            return done(null, false, { message: "Password is incorrect" });
                        }
                    });
                } else {
                    // If no user is found with the provided email, return an error message
                    return done(null, false, {
                        message: "No user with that email address"
                    });
                }
            }
        );
    };

    // Registering the Local Strategy
    passport.use(
        new LocalStrategy(
            { usernameField: "email", passwordField: "password" },
            authenticateUser
        )
    );

    
    // Microsoft Azure AD OIDC Stretegy for OAuth-based authentication
    passport.use(
        new OIDCStrategy(
            {
                identityMetadata: `https://login.microsoftonline.com/${process.env.TENANT_ID}/v2.0/.well-known/openid-configuration`,
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                responseType: "code",
                responseMode: "form_post",
                redirectUrl: process.env.REDIRECT_URI,
                allowHttpForRedirectUrl: false,
                scope: ['openid', 'profile', 'email', 'Calendars.Read', 'offline_access'],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = {
                        microsoftId: profile.oid,
                        email: profile._json.email,
                        firstName: profile.name.givenName,
                        lastName: profile.name.surname,
                        role: "user",
                        picture: profile._json.picture || "https://via.placeholder.com/100",
                        goal: "Set your goals", 
                        accessToken,
                        refreshToken,
                    };

                    // Save or update the user in the database
                    await saveOrUpdateUserWithMicrosoftInfo(user);
                    done(null, user); // Complete the authentication process
                } catch (err) {
                    console.error("Error handling OAuth callback:", err);
                    done(err); // Handle errors during authentication
                }
            }
        )
    );

    // Serialize user to session
    passport.serializeUser((user, done) => done(null, user.id));

    // Deserialize user from session
    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if (err) {
                return done(err);
            }

            return done(null, results.rows[0]); // Fixed typo from 'nul' to 'null'
        });
    });
}

module.exports = initialize;
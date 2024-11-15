const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");
const { OIDCStrategy } = require('passport-azure-ad');

function initialize(passport) {
    // Local Strategy
    const authenticateUser = (email, password, done) => {
        pool.query(
            `SELECT * FROM users WHERE email = $1`, [email], (error, results) => {
                if (error) { throw error; }

                if (results.rows.length > 0) {
                    const user = results.rows[0];

                    bcrypt.compare(password, user.passport, (err, isMatch) => {
                        if (err) {
                            console.log(err);
                        }

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Password is incorrect" });
                        }
                    });
                } else {
                    return done(null, false, {
                        message: "No user with that email address"
                    });
                }
            }
        );
    };
    
    passport.use(
        new LocalStrategy(
            { usernameField: "email", passwordField: "password"},
            authenticateUser
        )
    );

    // Azure AD OIDC Strategy
    passport.use(
        new OIDCStrategy(
            {
                identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/v2.0/.well-known/openid-configuration`,
                clientID: process.env.AZURE_CLIENT_ID,
                clientSecret: process.env.AZURE_CLIENT_SECRET,
                responseType: "code",
                responseMode: "form_post",
                redirectUrl: 'http://localhost:4000/auth/microsoft/callback',
                allowHttpForRedirectUrl: true,
                scope: ["openid", "profile", "email", "Calendars.Read"],
            },
            async (accessToken, refreshToken, profile, done) => {
                try {
                    const user = {
                        microsoftId: profile.oid,
                        email: profile._json.email,
                        name: profile.displayName,
                        accessToken,
                        refreshToken
                    };

                    await saveOrUpdateUserWithMicrosoftInfo(user);
                    return done(null, { profile, accessToken });
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if (err) { return done(err); }

            return done(nul, results.rows[0]);
        });
    });
}

module.exports = initialize;
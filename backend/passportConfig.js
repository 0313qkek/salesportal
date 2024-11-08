const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("./dbConfig");
const bcrypt = require("bcrypt");

function initialize(passport) {
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

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, results) => {
            if (err) { return done(err); }

            return done(nul, results.rows[0]);
        });
    });
}

module.exports = initialize;
// userService.js

const { pool } = require('./dbConfig'); // Ensure this matches your database setup

async function saveOrUpdateUserWithMicrosoftInfo(user) {
    const { microsoftId, email, name, accessToken, refreshToken } = user;

    try {
        // Check if the user already exists
        const result = await pool.query(
            `SELECT * FROM users WHERE microsoft_id = $1`,
            [microsoftId]
        );

        if (result.rows.length > 0) {
            // User exists, update accessToken and refreshToken
            await pool.query(
                `UPDATE users 
                 SET access_token = $1, refresh_token = $2, email = $3, name = $4
                 WHERE microsoft_id = $5`,
                [accessToken, refreshToken, email, name, microsoftId]
            );
            console.log("User updated with new tokens.");
        } else {
            // User does not exist, insert new user record
            await pool.query(
                `INSERT INTO users (microsoft_id, email, name, access_token, refresh_token)
                 VALUES ($1, $2, $3, $4, $5)`,
                [microsoftId, email, name, accessToken, refreshToken]
            );
            console.log("New user created and saved.");
        }
    } catch (error) {
        console.error("Error saving or updating user in database:", error);
        throw error;
    }
}

module.exports = { saveOrUpdateUserWithMicrosoftInfo };
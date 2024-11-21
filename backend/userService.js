const { pool } = require("./dbConfig");

/**
 * Save or update user information from Microsoft account login.
 * @param {Object} user - User object containing Microsoft account details.
 */
async function saveOrUpdateUserWithMicrosoftInfo(user) {
    const { microsoftId, email, firstName, lastName, phone, role, picture, goal, accessToken, refreshToken } = user;

    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE microsoft_id = $1`,
            [microsoftId]
        );

        if (result.rows.length > 0) {
            // Update existing user
            await pool.query(
                `UPDATE users 
                 SET email = $1, firstName = $2, lastName = $3, phone = $4, role = $5, picture = $6, goal = $7, access_token = $8, refresh_token = $9
                 WHERE microsoft_id = $10`,
                [email, firstName, lastName, phone, role, picture, goal, accessToken, refreshToken, microsoftId]
            );
            console.log("User updated successfully.");
        } else {
            // Create new user
            await pool.query(
                `INSERT INTO users (microsoft_id, email, firstName, lastName, phone, role, picture, goal, access_token, refresh_token) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                [microsoftId, email, firstName, lastName, phone, role, picture || "https://via.placeholder.com/100", goal, accessToken, refreshToken]
            );
            console.log("New user created.");
        }
    } catch (error) {
        console.error("Error saving or updating user:", error);
        throw error;
    }
}

async function getUserByMicrosoftId(microsoftId) {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE microsoft_id = $1`,
            [microsoftId]
        );

        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            throw new Error("User not found.");
        }
    } catch (error) {
        console.error("Error fetching user by Microsoft ID:", error);
        throw error;
    }
}

/**
 * Fetch user details by ID.
 * @param {Number} userId - User ID to fetch from the database.
 */
async function getUserById(userId) {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE id = $1`,
            [userId]
        );

        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            throw new Error("User not found.");
        }
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        throw error;
    }
}

async function updateUserProfile(user) {
    const { id, firstName, lastName, phone, role, picture, goal } = user;

    try {
        const result = await pool.query(
            `UPDATE users 
             SET firstName = $1, lastName = $2, phone = $3, role = $4, picture = $5, goal = $6
             WHERE id = $7 RETURNING *`,
            [firstName, lastName, phone, role, picture, goal, id]
        );

        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            throw new Error("Failed to update user profile.");
        }
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}

module.exports = {
    saveOrUpdateUserWithMicrosoftInfo,
    getUserById,
    updateUserProfile,
};
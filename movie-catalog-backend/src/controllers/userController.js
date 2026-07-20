const db = require("../config/db");

exports.getUsers = (req, res) => {
    const sql = `
    SELECT
        users.id,
        users.role_id,
        first_name,
        last_name,
        username,
        email,
        profile_image,
        role_name
    FROM users
    INNER JOIN roles
        ON users.role_id = roles.id
    ORDER BY users.id DESC
    `;

    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
};

exports.getUserById = (req, res) => {
    const sql = `
    SELECT
        users.id,
        users.role_id,
        first_name,
        last_name,
        username,
        email,
        profile_image,
        role_name
    FROM users
    INNER JOIN roles
        ON users.role_id = roles.id
    WHERE users.id = ?
    `;

    db.query(sql, [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }
        res.json(result[0]);
    });
};

exports.updateUser = (req, res) => {
    const { first_name, last_name, username, email, role_id } = req.body;

    const sql = `
        UPDATE users 
        SET 
            first_name = ?, 
            last_name = ?, 
            username = ?, 
            email = ?,
            role_id = COALESCE(?, role_id)
        WHERE id = ?
    `;

    const values = [
        first_name, 
        last_name, 
        username, 
        email, 
        role_id || null, 
        req.params.id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database Update Error:", err);
            return res.status(500).json(err);
        }

        return res.json({
            message: "User updated successfully."
        });
    });
};

exports.deleteUser = (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User deleted successfully." });
    });
};
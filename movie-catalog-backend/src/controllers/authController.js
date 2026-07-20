const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.updateProfile = (req, res) => {
    const userId = req.user.id;
    const { first_name, last_name, username, email } = req.body;

    const sql = `
        UPDATE users
        SET first_name = ?, last_name = ?, username = ?, email = ?
        WHERE id = ?
    `;

    db.query(sql, [first_name, last_name, username, email, userId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ message: "Profile updated successfully." });
    });
};

exports.uploadProfilePicture = (req, res) => {
    const userId = req.user.id;

    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    const imageName = req.file.filename;

    const sql = `UPDATE users SET profile_image = ? WHERE id = ?`;

    db.query(sql, [imageName, userId], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({
            message: "Profile picture updated successfully.",
            profile_image: imageName,
        });
    });
};


exports.register = async (req, res) => {

    const {
        first_name,
        last_name,
        username,
        email,
        password
    } = req.body;

    try {

        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            async (err, result) => {

                if (err)
                    return res.status(500).json(err);

                if (result.length > 0) {
                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const sql = `
                INSERT INTO users
                (
                    role_id,
                    first_name,
                    last_name,
                    username,
                    email,
                    password
                )
                VALUES (?, ?, ?, ?, ?, ?)
                `;

                db.query(
                    sql,
                    [
                        2,
                        first_name,
                        last_name,
                        username,
                        email,
                        hashedPassword
                    ],
                    (err) => {

                        if (err)
                            return res.status(500).json(err);

                        res.status(201).json({
                            message: "User registered successfully."
                        });

                    }
                );

            }
        );

    } catch (error) {

        res.status(500).json(error);

    }

};

exports.login = (req, res) => {

    const { email, password } = req.body;

    const sql = `
    SELECT
        users.*,
        roles.role_name
    FROM users
    INNER JOIN roles
        ON users.role_id = roles.id
    WHERE users.email = ?
    `;

    db.query(sql, [email], async (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.length === 0) {

            return res.status(401).json({
                message: "Invalid email or password."
            });

        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {

            return res.status(401).json({
                message: "Invalid email or password."
            });

        }

        const token = jwt.sign(

            {
                id: user.id,
                role: user.role_name
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        res.json({

            message: "Login successful.",

            token,

            user: {

                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                profile_image: user.profile_image,
                role: user.role_name

            }

        });

    });

};


exports.profile = (req, res) => {

    const sql = `
    SELECT
        users.id,
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

    db.query(sql, [req.user.id], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result[0]);

    });

};


exports.adminDashboard = (req, res) => {

    res.json({

        message: "Welcome Admin",

        user: req.user

    });

};
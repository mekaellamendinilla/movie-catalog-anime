const db = require("../config/db");

//GET EDNPOINT
exports.getMovies = (req, res) => {

    const sql = "SELECT * FROM movies";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(result);

    });

};

//GET EDNPOINT BY ID
exports.getMovieById = (req, res) => {

    const id = req.params.id;

    const sql = "SELECT * FROM movies WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.status(200).json(result[0]);

    });

};

// POST ENDPOINT
exports.createMovie = (req, res) => {

    const {
        title,
        category,
        duration,
        year,
        image,
        description
    } = req.body;

    const sql = `
        INSERT INTO movies
        (title, category, duration, year, image, description)

        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql,

        [
            title,
            category,
            duration,
            year,
            image,
            description
        ],

        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Movie added successfully"
            });

        }

    );

};

// PUT ENDPOINT
exports.updateMovie = (req, res) => {

    const id = req.params.id;

    const {
        title,
        category,
        duration,
        year,
        image,
        description
    } = req.body;

    const sql = `
        UPDATE movies

        SET
        title=?,
        category=?,
        duration=?,
        year=?,
        image=?,
        description=?

        WHERE id=?
    `;

    db.query(

        sql,

        [
            title,
            category,
            duration,
            year,
            image,
            description,
            id
        ],

        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Movie updated successfully"
            });

        }

    );

};

// DELETE ENDPOINT
exports.deleteMovie = (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM movies WHERE id=?";

    db.query(sql, [id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Movie deleted successfully"
        });

    });

};
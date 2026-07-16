const db = require("../config/db");

//GET EDNPOINT
exports.getMovies = (req, res) => {
    const sql = `
        SELECT
            movies.id,
            movies.title,
            movies.category_id,
            movies.duration,
            movies.year,
            movies.image,
            movies.description,
            movies.created_at,
            movies.updated_at,
            categories.name AS category_name
        FROM movies
        LEFT JOIN categories
            ON movies.category_id = categories.id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to fetch movies",
                error: err,
            })
        }

        res.status(200).json(result);

    });

};

//GET EDNPOINT BY ID
exports.getMovieById = (req, res) => {

    const id = req.params.id;

    const sql = `
        SELECT
            movies.id,
            movies.title,
            movies.category_id,
            movies.duration,
            movies.year,
            movies.image,
            movies.description,
            movies.created_at,
            movies.updated_at,
            categories.name AS category_name
        FROM movies
        LEFT JOIN categories
            ON movies.category_id = categories.id
        WHERE movies.id = ?
    `;

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
exports.addMovie = (req, res) => {

    const {
        title,
        category_id,
        duration,
        year,
        description
    } = req.body;

    const image = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO movies
        (title, category_id, duration, year, image, description)

        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql,

        [
            title,
            category_id,
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
        category_id,
        duration,
        year,
        description
    } = req.body;

    const imageFileName = req.file ? req.file.filename : null;

    const handleUpdate = (currentImage) => {
        const sql = req.file
            ? `
                UPDATE movies
                SET
                    title=?,
                    category_id=?,
                    duration=?,
                    year=?,
                    image=?,
                    description=?
                WHERE id=?
            `
            : `
                UPDATE movies
                SET
                    title=?,
                    category_id=?,
                    duration=?,
                    year=?,
                    image=?,
                    description=?
                WHERE id=?
            `;

        const params = req.file
            ? [title, category_id, duration, year, imageFileName, description, id]
            : [title, category_id, duration, year, currentImage, description, id];

        db.query(sql, params, (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Movie updated successfully"
            });
        });
    };

    if (req.file) {
        handleUpdate(imageFileName);
        return;
    }

    db.query("SELECT image FROM movies WHERE id = ?", [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }

        const currentImage = result[0]?.image || null;
        handleUpdate(currentImage);
    });

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

exports.searchMovies = (req, res) => {

    const { title } = req.query;

    const sql = `
        SELECT
            movies.id,
            movies.title,
            movies.category_id,
            movies.duration,
            movies.year,
            movies.image,
            movies.description,
            movies.created_at,
            movies.updated_at,
            categories.name AS category_name
        FROM movies
        LEFT JOIN categories
            ON movies.category_id = categories.id
        WHERE movies.title LIKE ?
    `;

    db.query(sql, [`%${title}%`], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

exports.filterCategory = (req, res) => {

    const categoryId = req.params.id;

    const sql = `
        SELECT
            movies.id,
            movies.title,
            movies.category_id,
            movies.duration,
            movies.year,
            movies.image,
            movies.description,
            movies.created_at,
            movies.updated_at,
            categories.name AS category_name
        FROM movies
        LEFT JOIN categories
            ON movies.category_id = categories.id
        WHERE movies.category_id = ?
    `;

    db.query(sql, [categoryId], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

exports.pagination = (req, res) => {

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const offset = (page - 1) * limit;

    const sql = `
        SELECT
            movies.id,
            movies.title,
            movies.category_id,
            movies.duration,
            movies.year,
            movies.image,
            movies.description,
            movies.created_at,
            movies.updated_at,
            categories.name AS category_name
        FROM movies
        LEFT JOIN categories
            ON movies.category_id = categories.id
        LIMIT ? OFFSET ?
    `;

    db.query(sql, [limit, offset], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};
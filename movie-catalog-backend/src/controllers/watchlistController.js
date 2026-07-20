const db = require("../config/db");

exports.getWatchlist = (req, res) => {
    const userId = req.user.id;

    const sql = `
        SELECT
            watchlists.id,
            movies.id AS movie_id,
            movies.title,
            movies.description,
            movies.image,
            movies.year,
            movies.duration,
            movies.category_id,
            categories.name AS category_name
        FROM watchlists
        INNER JOIN movies
            ON watchlists.movie_id = movies.id
        LEFT JOIN categories
            ON movies.category_id = categories.id
        WHERE watchlists.user_id = ?
    `;

    db.query(sql, [userId], (err, result) => {

        if (err)
            return res.status(500).json(err);

        res.json(result);

    });

};

exports.addWatchlist = (req, res) => {

    const userId = req.user.id;
    const { movie_id } = req.body;

    const checkSql =
        "SELECT * FROM watchlists WHERE user_id = ? AND movie_id = ?";

    db.query(checkSql, [userId, movie_id], (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.length > 0) {

            return res.status(400).json({
                message: "Movie already in watchlist."
            });

        }

        const insertSql =
            "INSERT INTO watchlists (user_id, movie_id) VALUES (?, ?)";

        db.query(insertSql, [userId, movie_id], (err) => {

            if (err)
                return res.status(500).json(err);

            res.status(201).json({
                message: "Movie added to watchlist."
            });

        });

    });

};

exports.removeWatchlist = (req, res) => {

    const userId = req.user.id;
    const movieId = req.params.movieId;

    const sql =
        "DELETE FROM watchlists WHERE user_id = ? AND movie_id = ?";

    db.query(sql, [userId, movieId], (err, result) => {

        if (err)
            return res.status(500).json(err);

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Movie not found in watchlist."
            });

        }

        res.json({
            message: "Movie removed from watchlist."
        });

    });

};
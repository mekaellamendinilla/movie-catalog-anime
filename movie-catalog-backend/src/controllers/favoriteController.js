const db = require("../config/db");

exports.getFavorites = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT
      favorites.id,
      movies.id AS movie_id,
      movies.title,
      movies.description,
      movies.image,
      movies.year,
      movies.duration,
      movies.category_id,
      categories.name AS category_name
    FROM favorites
    INNER JOIN movies
      ON favorites.movie_id = movies.id
    LEFT JOIN categories
      ON movies.category_id = categories.id
    WHERE favorites.user_id = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};


exports.addFavorite = (req, res) => {
  const userId = req.user.id;
  const { movie_id } = req.body;

  // Check kung favorite na
  const checkSql =
    "SELECT * FROM favorites WHERE user_id = ? AND movie_id = ?";

  db.query(checkSql, [userId, movie_id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length > 0) {
      return res.status(400).json({
        message: "Movie already in favorites."
      });
    }

    const insertSql =
      "INSERT INTO favorites (user_id, movie_id) VALUES (?, ?)";

    db.query(insertSql, [userId, movie_id], (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Movie added to favorites."
      });
    });
  });
};

exports.removeFavorite = (req, res) => {
  const userId = req.user.id;
  const movieId = req.params.movieId;

  const sql =
    "DELETE FROM favorites WHERE user_id = ? AND movie_id = ?";

  db.query(sql, [userId, movieId], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Favorite not found."
      });
    }

    res.json({
      message: "Movie removed from favorites."
    });
  });
};
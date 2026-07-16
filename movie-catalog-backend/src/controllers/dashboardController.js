const db = require("../config/db");

exports.getDashboard = (req, res) => {
  const dashboard = {};

  db.query(
    "SELECT COUNT(*) AS totalMovies FROM movies",
    (err, movieResult) => {

      if (err) return res.status(500).json(err);

      dashboard.totalMovies = movieResult[0].totalMovies;

      db.query(
        "SELECT COUNT(*) AS totalUsers FROM users",
        (err, userResult) => {

          if (err) return res.status(500).json(err);

          dashboard.totalUsers = userResult[0].totalUsers;

          db.query(
            "SELECT COUNT(*) AS totalCategories FROM categories",
            (err, categoryResult) => {

              if (err) return res.status(500).json(err);

              dashboard.totalCategories =
                categoryResult[0].totalCategories;

              db.query(
                "SELECT COUNT(*) AS totalFavorites FROM favorites",
                (err, favoriteResult) => {

                  if (err) return res.status(500).json(err);

                  dashboard.totalFavorites =
                    favoriteResult[0].totalFavorites;

                  db.query(
                    "SELECT COUNT(*) AS totalWatchlists FROM watchlists",
                    (err, watchlistResult) => {

                      if (err)
                        return res.status(500).json(err);

                      dashboard.totalWatchlists =
                        watchlistResult[0].totalWatchlists;

                      res.json(dashboard);

                    }
                  );

                }
              );

            }
          );

        }
      );

    }
  );
};
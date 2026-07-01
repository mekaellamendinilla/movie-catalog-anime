const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

router.get("/", movieController.getMovies);

router.get("/:id", movieController.getMovieById);

router.post("/", movieController.createMovie);

router.put("/:id", movieController.updateMovie);

router.delete("/:id", movieController.deleteMovie);

module.exports = router;














/*const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "GET all movies endpoint working!"
  });
});


module.exports = router; */
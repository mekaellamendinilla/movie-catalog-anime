const express = require("express");
const router = express.Router();

const movieController = require("../controllers/movieController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// UPLOADAN NG IMAGES
const upload = require("../middleware/upload");

// Public
router.get("/", movieController.getMovies);

router.get("/search", movieController.searchMovies);
router.get("/category/:id", movieController.filterCategory);
router.get("/page", movieController.pagination);

router.get("/:id", movieController.getMovieById);


// Admin Only
{/*
router.post(
    "/",
    authMiddleware,
    roleMiddleware("Admin"),
    movieController.addMovie
); 
*/}

router.post(
    "/",
    authMiddleware,
    roleMiddleware("Admin"),
    upload.single("image"),
    movieController.addMovie
);

router.put(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    upload.single("image"),
    movieController.updateMovie
);

router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware("Admin"),
    movieController.deleteMovie
);

module.exports = router;














/*const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "GET all movies endpoint working!"
  });
});


module.exports = router; */
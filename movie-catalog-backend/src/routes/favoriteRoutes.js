const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

// Get all favorites
router.get("/", authMiddleware, favoriteController.getFavorites);

// Add favorite
router.post("/", authMiddleware, favoriteController.addFavorite);

// Remove favorite
router.delete("/:movieId", authMiddleware, favoriteController.removeFavorite);

module.exports = router;
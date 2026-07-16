const express = require("express");
const router = express.Router();

const watchlistController = require("../controllers/watchlistController");
const authMiddleware = require("../middleware/authMiddleware");

// Get Watchlist
router.get("/", authMiddleware, watchlistController.getWatchlist);

// Add Watchlist
router.post("/", authMiddleware, watchlistController.addWatchlist);

// Remove Watchlist
router.delete("/:movieId", authMiddleware, watchlistController.removeWatchlist);

module.exports = router;
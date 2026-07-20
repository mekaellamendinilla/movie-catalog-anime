const express = require("express");
const router = express.Router();

const watchlistController = require("../controllers/watchlistController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, watchlistController.getWatchlist);

router.post("/", authMiddleware, watchlistController.addWatchlist);

router.delete("/:movieId", authMiddleware, watchlistController.removeWatchlist);

module.exports = router;
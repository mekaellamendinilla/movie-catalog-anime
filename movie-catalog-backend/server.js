require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./src/config/db");

const movieRoutes = require("./src/routes/movieRoutes");
const categoryRoutes = require("./src/routes/categoryRoutes");
const authRoutes = require("./src/routes/authRoutes");
const favoriteRoutes = require("./src/routes/favoriteRoutes");
const watchlistRoutes = require("./src/routes/watchlistRoutes");

const dashboardRoutes = require("./src/routes/dashboardRoutes");
const userRoutes = require("./src/routes/userRoutes");
const adminRoutes=require("./src/routes/adminRoutes");

// UPLOADAN NG IMAGES
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Test
db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
  } else {
    console.log("Database connected successfully");
  }
});

// Routes
app.use("/api/movies", movieRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/watchlist", watchlistRoutes);

app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin",adminRoutes);

// UPLOADAN NG IMAGES
app.use(
    "/uploads",
    express.static(
        path.join(__dirname,"uploads")
    )
);

// Default Route
app.get("/", (req, res) => {
  res.json({
    message: "Movie Catalog API Running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

























/*const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/

























/*const express = require("express");
const app = express();

app.use(express.json());

const movies = [];

// GET ENDPOINT BOI
app.get("/movies", (req, res) => {
    res.status(200).json(movies);
});

// POST ENDPOINT BOI
app.post("/movies", (req, res) => {

    const { title, category, duration, year, description } = req.body;

    // Validation
    if (!title) {
        return res.status(400).json({
            message: "Title is required"
        });
    }

    if (!category) {
        return res.status(400).json({
            message: "Category is required"
        });
    }

    if (!duration) {
        return res.status(400).json({
            message: "duration is required"
        });
    }

    if (!year) {
        return res.status(400).json({
            message: "year is required"
        });
    }

    if (!description) {
        return res.status(400).json({
            message: "description is required"
        });
    }

    // Create new movie object
    const newMovie = {
        id: movies.length + 1,
        title,
        category,
        duration,
        year,
        description
    };

    // Save to array
    movies.push(newMovie);

    // Send response
    res.status(201).json({
        message: "Movie added successfully",
        movie: newMovie
    });

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
}); */
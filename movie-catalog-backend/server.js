const express = require("express");
const cors = require("cors");
require("dotenv").config();

const movieRoutes = require("./src/routes/movieRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/movies", movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


























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
const db = require("../config/db");

// GET ALL CATEGORIES
exports.getCategories = (req, res) => {
  const sql = "SELECT * FROM categories";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch categories",
        error: err,
      });
    }

    res.status(200).json(results);
  });
};

// GET CATEGORY BY ID
exports.getCategoryById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM categories WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(results[0]);
  });
};

// CREATE CATEGORY (POST)
exports.createCategory = (req, res) => {
  const { name, description } = req.body;

  const sql =
    "INSERT INTO categories (name, description) VALUES (?, ?)";

  db.query(sql, [name, description], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Category created successfully",
      id: result.insertId,
    });
  });
};



// UPDATE CATEGORY (PUT)
exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const sql =
    "UPDATE categories SET name=?, description=? WHERE id=?";

  db.query(sql, [name, description, id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Category updated successfully",
    });
  });
};

// DELETE CATEGORY
exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM categories WHERE id=?";

  db.query(sql, [id], (err) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Category deleted successfully",
    });
  });
};
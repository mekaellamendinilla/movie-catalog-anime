const db = require("../config/db");

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
const db = require("../database/db");

exports.getAllCategories = async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const categories = await db.query(
      "SELECT name FROM expense_category WHERE user_id = $1",
      [user_id]
    );

    if (categories && categories.length > 0) {
      res.status(200).json(categories);
    } else {
      res.status(404).json({ message: "No categories found for the user." });
    }
  } catch (error) {
    // Handle any errors that occurred during the database query
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Implement logic to retrieve a specific category by ID
exports.getCategoryByExpenseId = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const categoryId = await db.query(
      "SELECT category_id FROM expense WHERE id = $1",
      [expenseId]
    );
    const categoryName = await db.query(
      "SELECT name FROM category WHERE id = $1",
      [categoryId[0].category_id]
    );

    if (categoryName && categoryName.length > 0) {
      res.status(200).json(categoryName);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    console.error("Error fetching category by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

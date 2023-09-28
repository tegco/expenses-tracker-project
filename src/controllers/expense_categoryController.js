const db = require('../database/db');

exports.getAllCategories = async (req, res) => {

  const user_id = req.params.user_id;
  try{
    const categories = await db.query('SELECT name FROM expense_category WHERE user_id = $1', [user_id]);

    // Check if categories were found
    if (categories && categories.length > 0) {
      res.status(200).json(categories);
    } else {
      // Handle the case where no categories were found
      res.status(404).json({ message: 'No categories found for the user.' });
    }

  }catch (error){
    // Handle any errors that occurred during the database query
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  };
  
  exports.getCategoryBId = async (req, res) => {
    // Implement logic to retrieve a specific expense by ID
  };
  
  exports.createCategory = async (req, res) => {
    // Implement logic to create a new expense
  };
  
  exports.updateCategory = async (req, res) => {
    // Implement logic to update an existing expense by ID
  };
  
  exports.deleteCategory = async (req, res) => {
    // Implement logic to delete an expense by ID
  };


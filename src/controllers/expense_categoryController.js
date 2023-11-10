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
  
  // Implement logic to retrieve a specific category by ID
  exports.getCategoryByExpenseId = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const category = await db.query('SELECT * FROM expense_category WHERE id = $1', [categoryId]);

      if(category && category.length > 0){
        res.status(200).json(category[0]);
      } else {
        res.status(404).json({message: 'Category not found'});
      }
    } catch (error){
      console.error('Error fetching category by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

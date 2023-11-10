const db = require('../database/db');

exports.createExpense = async (req, res) => {
  
  const { expense_date, description, amount, payment_method, category_id} = req.body;
  const loggedUserId = req.user.id;
  const result =  await db.query("SELECT selected_currency_id FROM app_user WHERE id = $1", [loggedUserId]);

if (result && result.length > 0) {
  const selectedCurrencyId = result[0].selected_currency_id;
  console.log("currency =>" , selectedCurrencyId);

  try {
    const newExpense = await db.query(
      'INSERT INTO expense (expense_date, description, amount, user_id, selected_currency_id, payment_method_id, category_id) VALUES (to_date($1, \'DD-MM-YYYY\'), $2, $3, $4, $5, $6, $7) RETURNING *', 
      [expense_date, description, amount, loggedUserId, selectedCurrencyId, payment_method, category_id]
      );
    res.status(201).json(newExpense[0]);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} else {
  res.status(404).json({ message: 'User not found' });
}
};

exports.getAllExpenses = async (req, res) => {
    try {
      const loggedUserId = req.user.id;
      const result = await db.query('SELECT * FROM expense WHERE user_id = $1', [loggedUserId]);
  
      if (result && result.length > 0) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'No expenses found for the user.' });
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.getExpenseById = async (req, res) => {
    try {
      const expenseId = req.params.id; // Estava a usar {}, é por isso que não funcionava
      const expense = await db.query('SELECT * FROM expense WHERE id = $1', [expenseId]);
  
      if ( expense && expense.length > 0) {
        res.status(200).json(expense[0]);
      } else {
        res.status(404).json({ message: 'Expense not found' });
      }
    } catch (error) {
      console.error('Error fetching expense by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.updateExpense = async (req, res) => {
    try {

      const expenseId = req.params.id;
      const { expense_date, description, amount, payment_method_id, category_id} = req.body;
  
      const result = await db.query(
        'UPDATE expense SET expense_date = $1, description = $2, amount = $3, payment_method_id = $4, category_id = $5 WHERE id = $6 RETURNING *',
        [expense_date, description, amount, payment_method_id, category_id, expenseId]
      );
  
      if (result.length === 0) {
        res.status(404).json({ message: 'Expense not found' });
      } else {
        res.status(200).json(result[0]);
      }
    } catch (error) {
      console.error('Error updating expense:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.deleteExpense = async (req, res) => {
    try {
      const expenseId = req.params.id;
  
      const result = await db.query('DELETE FROM expense WHERE id = $1 RETURNING *', [expenseId]);
  
      if (result.length === 0) {
        res.status(404).json({ message: 'Expense not found' });
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.getCategoryByExpenseId = async (req, res) => {
    try {
      const expenseId = req.params.id;
      //console.log("Expense ID == ", expenseId);
      const categoryId = await db.query('SELECT category_id FROM expense WHERE id = $1', [expenseId]);
      const categoryResult = categoryId[0].category_id;
      //console.log("Category ID == ", category_result);
      const result = await db.query('SELECT name FROM category WHERE id = $1', [categoryResult]);

      if (result.length === 0) {
        res.status(404).json({ message: 'Category not found' });
      } else {
        res.status(200).json(result[0]);
      }

    } catch (error) {
      console.error('Error fetching category by expense ID: ', error );
      res.status(500).json({message: 'Internal server error'});
    }
  }

  exports.getExpensesByCategoryId = async (req, res) =>{
    try {
      const loggedUserId = req.user.id;
      const categoryID = req.params.id;
      const expenses = await db.query('SELECT * FROM expense WHERE user_id = $1 AND category_id = $2',
        [loggedUserId, categoryID]);

        if(expenses.length === 0){
          res.status(404).json({message:'Expenses for this category not found'});
        } else {
          res.status(200).json(expenses);
        }
    } catch (error){
      console.error('Error fetching expenses for this category: ', error );
      res.status(500).json({message:'Internal server error'});
    }
  }
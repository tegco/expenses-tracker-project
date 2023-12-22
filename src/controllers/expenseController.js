const db = require('../database/db');
const { updateMonthlyTotals } = require('../utils/monthlyTotalsUpdate');
const {validateCreateOrUpdateExpense} = require('../middleware/validationMiddleware');

exports.createExpense = async (req, res) => {
  try {
    await validateCreateOrUpdateExpense(req, res);

  } catch (error){
    const errorMessages = error.errors.map(err => err.msg);
    return res.status(401).json({ message: 'Validation failed', errors: errorMessages });
  }

  const { expense_date, description, amount, payment_method_id, category_id} = req.body;
  const loggedUserId = req.user.id;
  const result =  await db.query('SELECT selected_currency_id FROM app_user WHERE id = $1', [loggedUserId]);

  if (result && result.length > 0) {
    const selectedCurrencyId = result[0].selected_currency_id;

  try {
    const newExpense = await db.query(
      'INSERT INTO expense (expense_date, description, amount, user_id, selected_currency_id, payment_method_id, category_id) VALUES (to_date($1, \'YYYY-MM-DD\'), $2, $3, $4, $5, $6, $7) RETURNING *', 
      [expense_date, description, amount, loggedUserId, selectedCurrencyId, payment_method_id, category_id]
      );

    const [year, month, day] = expense_date.split('-');
    updateMonthlyTotals(loggedUserId, year, month, 'expense');
    res.status(201).json(newExpense[0]);

  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

} else {
  res.status(404).json({ message: 'User not found' });
}};

exports.getExpensesByMonthAndYear = async (req, res) => {
    try {
      const { year, month} = req.params;
      const loggedUserId = req.user.id;
      const result = await db.query('SELECT * FROM expense WHERE user_id = $1 AND EXTRACT(YEAR FROM expense_date) = $2 AND EXTRACT(MONTH FROM expense_date) = $3', 
      [loggedUserId, year, month]);
  
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
    await validateCreateOrUpdateExpense(req, res);

  } catch (error){
    const errorMessages = error.errors.map(err => err.msg);
    return res.status(401).json({ message: 'Validation failed', errors: errorMessages });
  }

  const expenseId = req.params.id;
  const loggedUserId = req.user.id;
  const { expense_date, description, amount, payment_method_id, category_id} = req.body;
 
  try {
    const result = await db.query(
      'UPDATE expense SET expense_date = $1, description = $2, amount = $3, payment_method_id = $4, category_id = $5 WHERE id = $6 RETURNING *',
        [expense_date, description, amount, payment_method_id, category_id, expenseId]
    );
    const [year, month, day] = expense_date.split('-');

    updateMonthlyTotals(loggedUserId, year, month, 'expense');
  
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
    const loggedUserId = req.user.id;

    // Get the user ID and expense_date before deleting the expense
    const expenseDate = await db.query('SELECT expense_date FROM expense WHERE id = $1', [expenseId]);
    const result = await db.query('DELETE FROM expense WHERE id = $1 RETURNING *', [expenseId]);
      
    if (result.length === 0) {
      res.status(404).json({ message: 'Expense not found' });
    } else {
      // Extract year and month from the expense_date string
      const [year, month, day] = expenseDate[0].expense_date.toISOString().split('T')[0].split('-');

      // Update monthly totals after deleting the expense
      updateMonthlyTotals(loggedUserId, year, month, 'expense');
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
    const categoryId = await db.query('SELECT category_id FROM expense WHERE id = $1', [expenseId]);
    const categoryResult = categoryId[0].category_id;
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
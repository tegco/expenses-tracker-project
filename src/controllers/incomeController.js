const db = require('../database/db');
const monthlyTotalsUpdate = require('../utils/monthlyTotalsUpdate');

exports.getIncomeById = async (req, res) => {
  const incomeId = req.params.id;

  try {
    const user_income = await db.query('SELECT * FROM income WHERE id = $1', [incomeId]);
    
    if(user_income && user_income.length > 0){
      res.status(200).json(user_income);
    } else {
      res.status(400).json({message: 'No income found for the user.'});
    }
  } catch (error){
      console.error('Error fetching income:', error);
      res.status(500).json({message: 'Internal server error'});
  }
};

  exports.getIncomeByMonthAndYear = async (req, res) => {
    const { year, month } = req.params;
    const loggedUserId = req.user.id;
  
    try {
      // Use the year and month parameters in your database query
      const userIncome = await db.query(
        'SELECT * FROM income WHERE user_id = $1 AND EXTRACT(YEAR FROM income_date) = $2 AND EXTRACT(MONTH FROM income_date) = $3',
         [loggedUserId, year, month]);
  
      if (userIncome && userIncome.length > 0) {
        res.status(200).json(userIncome);
      } else {
        res.status(400).json({ message: 'No income found for the user in the specified month and year.' });
      }
    } catch (error) {
      console.error('Error fetching income:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.createIncome = async (req, res) => {
    const loggedUserId = req.user.id;
    const {income_date, amount, description} = req.body;

    try {
    const result =  await db.query("SELECT selected_currency_id FROM app_user WHERE id = $1", [loggedUserId]);

      if (result && result.length > 0) {
        const selectedCurrencyId = result[0].selected_currency_id;
        const newIncome = await db.query(
            'INSERT INTO income (income_date, amount, description, user_id, selected_currency_id) VALUES (to_date($1, \'DD-MM-YYYY\'), $2, $3, $4, $5)', [
              income_date, amount, description, loggedUserId, selectedCurrencyId]
            );

          const [day, month, year] = income_date.split('-');
          // Update monthly totals with the extracted year and month
          updateMonthlyTotals(loggedUserId, year, month, 'income')
          res.status(201).json(newIncome[0]);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error creating income:', error);
      res.status(500).json({ message: 'Internal server error' });
  }  
  };
  
  exports.updateIncome = async (req, res) => {
    const incomeId = req.params.id;
    const {income_date, amount, description} = req.body;

    try {
      const result = await db.query(
        'UPDATE income SET income_date = $1, amount = $2, description = $3 WHERE id = $4 RETURNING *',
        [income_date, amount, description, incomeId]
      );
  
      if (result.length === 0) {
        res.status(404).json({ message: 'Income not found' });
      } else {
        const [day, month, year] = expense_date.split('-');

        // Update monthly totals with the extracted year and month
        updateMonthlyTotals(loggedUserId, year, month, 'income');
        res.status(200).json(result[0]);
      }
    } catch (error) {
      console.error('Error updating income:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.deleteIncome = async (req, res) => {
    try {
      const incomeId = req.params.id;
      const {loggedUserId, incomeDate} = await db.query('SELECT user_id, income_date FROM income WHERE id = $1', [incomeId]);
  
      const result = await db.query('DELETE FROM income WHERE id = $1 RETURNING *', [incomeId]);
  
      if (result.length === 0) {
        res.status(404).json({ message: 'Income not found' });
      } else {
        const [day, year, month] = incomeDate.split('-');
        // Call the function to update monthly totals
        await monthlyMonthAndYearUpdate(loggedUserId, year, month, 'income');
        res.status(204).send();
      }
    } catch (error) {
      console.error('Error deleting income:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
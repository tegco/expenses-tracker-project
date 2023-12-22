const db = require('../database/db');


/* the table 'app-user' will include a field named 'monthly_totals' of type 'jsonb' - stores a json
   object representing monthly totals for expenses and income; */

/*This function calculates the monthly totals for expenses or income based on the user, year, and month.
  The function retrieves the current monthly totals from the app_user table, updates the totals for the specific month and year, and then updates the monthly_totals column.*/
  const updateMonthlyTotals = async (userId, year, month, type) => {
    try {
      // Retrieve the existing monthly_totals for the user
      const monthlyTotalResult = await getMonthlyTotals(userId);
      const currentMonthlyTotal = monthlyTotalResult[0]?.monthly_totals || {};
  
      // Extract the current total for the specified month and year
      const existingTotal = currentMonthlyTotal[`${year}-${month}`] || { total_expense: 0, total_income: 0 };

      // Calculate the new total from the expenses/income table
      const result = await db.query(
        `SELECT COALESCE(SUM(amount)) AS total_${type}
         FROM ${type === 'expense' ? 'expense' : 'income'} 
         WHERE user_id = $1 AND EXTRACT(YEAR FROM ${type === 'expense' ? 'expense' : 'income'}_date) = $2 AND EXTRACT(MONTH FROM ${type === 'expense' ? 'expense' : 'income'}_date) = $3`,
        [userId, year, month]
      );
  
      if (result && result.length > 0 && `total_${type}` in result[0]) {
        existingTotal[`total_${type}`] = result[0][`total_${type}`];
      }
  
      // Create a new entry for the specified year and month
    const newEntry = {
      [`${year}-${month}`]: existingTotal,
    };

    // Update the monthly_totals by adding the new entry
    const updatedMonthlyTotal = {
      ...currentMonthlyTotal,
      ...newEntry,
    };
  
    console.log("Existing Monthly totals:", currentMonthlyTotal);
    console.log("New Entry:", newEntry);
    console.log("Updated Monthly totals:", updatedMonthlyTotal);
  
      // Update the app_user table with the modified monthly_totals
      await db.query('UPDATE app_user SET monthly_totals = $1 WHERE id = $2', [updatedMonthlyTotal, userId]);
    } catch (error) {
      console.error('Error updating monthly totals:', error);
    }
  };
   
  const getMonthlyTotals = async (userId) => {
    const result = await db.query('SELECT monthly_totals FROM app_user WHERE id = $1', [userId]);
    return result || {};
  };
  
  module.exports = { updateMonthlyTotals, getMonthlyTotals };
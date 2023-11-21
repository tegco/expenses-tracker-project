const db = require('../database/db');


/* the table 'app-user' will include a field named 'monthly_totals' of type 'jsonb' - stores a json
   object representing monthly totals for expenses and income; */

/*This function calculates the monthly totals for expenses or income based on the user, year, and month.
  The function retrieves the current monthly totals from the app_user table, updates the totals for the specific month and year, and then updates the monthly_totals column.*/
  const updateMonthlyTotals = async (userId, year, month, totalType) => {
    let newTotalExpense = 0;
    
    try {
      // Retrieve the existing monthly_totals for the user
      const monthlyTotalResult = await db.query('SELECT monthly_totals FROM app_user WHERE id = $1', [userId]);
      console.log("monthlyTotalResult == ", monthlyTotalResult);
      const currentMonthlyTotal = monthlyTotalResult[0]?.monthly_totals || {};
  
      // Extract the current total_expense for the specified month
      const existingTotalExpense = currentMonthlyTotal[`${year}-${month}`]?.total_expense || 0;
  
      // Calculate the new total_expense from the expenses table
      const result = await db.query(
        `SELECT COALESCE(SUM(amount)) AS total_expense
         FROM expense 
         WHERE user_id = $1 AND EXTRACT(YEAR FROM expense_date) = $2 AND EXTRACT(MONTH FROM expense_date) = $3`,
        [userId, year, month]
      );
  
      if (result && result.length > 0 && 'total_expense' in result[0]) {
        newTotalExpense = result[0].total_expense;
      }
      
      console.log("result[0].total_expense == ", result[0].total_expense);
      console.log("Existing total_expense:", existingTotalExpense);
      console.log("New total_expense:", newTotalExpense);
  
      // Update the monthly_totals with the new total_expense
      const updatedMonthlyTotal = {
        ...currentMonthlyTotal,
        [`${year}-${month}`]: {
          total_expense: newTotalExpense,
        },
      };
  
      console.log("Updated Monthly totals:", updatedMonthlyTotal);
  
      // Update the app_user table with the modified monthly_totals
      await db.query('UPDATE app_user SET monthly_totals = $1 WHERE id = $2', [updatedMonthlyTotal, userId]);
    } catch (error) {
      console.error('Error updating monthly totals:', error);
    }
  };
   
  const getMonthlyTotals = async (userId) => {
    const result = await db.query('SELECT monthly_totals FROM app_user WHERE id = $1', [userId]);
    return result[0] || {}; 
  };
  
  module.exports = { updateMonthlyTotals, getMonthlyTotals };
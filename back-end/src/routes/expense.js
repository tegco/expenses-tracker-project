const express = require('express');
const expenseRouter = express.Router();
const expenseController = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/authMiddleware');


expenseRouter.post('/api/expenses', authenticateToken, expenseController.createExpense);
expenseRouter.get('/api/expenses/:year/:month', authenticateToken, expenseController.getExpensesByMonthAndYear);
expenseRouter.get('/api/expenses/:id', authenticateToken, expenseController.getExpenseById);
expenseRouter.put('/api/expenses/:id', authenticateToken, expenseController.updateExpense);
expenseRouter.delete('/api/expenses/:id', authenticateToken, expenseController.deleteExpense);
expenseRouter.get('/api/expenses/:id/category', authenticateToken, expenseController.getCategoryByExpenseId);
expenseRouter.get('/api/expenses/category/:id', authenticateToken, expenseController.getExpensesByCategoryId);

module.exports = expenseRouter;
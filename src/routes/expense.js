const express = require('express');
const db = require('../database/db');
const Joi = require('joi');
const expenseRouter = express.Router();
const expenseController = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/authMiddleware');


expenseRouter.post('/api/expenses', authenticateToken, expenseController.createExpense);
expenseRouter.get('/api/expenses', authenticateToken, expenseController.getAllExpenses);
expenseRouter.get('/api/expenses/:id', authenticateToken, expenseController.getExpenseById);
expenseRouter.put('/api/expenses/:id', authenticateToken, expenseController.updateExpense);
expenseRouter.delete('/api/expenses/:id', authenticateToken, expenseController.deleteExpense);

function validateExpense(expense) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  return schema.validate(expense);
}

module.exports = expenseRouter;
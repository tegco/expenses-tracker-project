const express = require('express');
const expense_categoryRouter = express.Router();
const expense_categoryController = require('../controllers/expense_categoryController');

expense_categoryRouter.get('/api/categories', expense_categoryController.getAllCategories);
expense_categoryRouter.get('/api/expenses/:id/category', expense_categoryController.getCategoryByExpenseId);

module.exports = expense_categoryRouter;
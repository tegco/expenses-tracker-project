const express = require('express');
const db = require('../database/db');
const Joi = require('joi');
const expense_categoryRouter = express.Router();
const expense_categoryController = require('../controllers/expense_categoryController');

expense_categoryRouter.get('/api/categories', expense_categoryController.getAllCategories);
expense_categoryRouter.post('/api/categories/create', expense_categoryController.createCategory);
expense_categoryRouter.get('/api/categories/:id', expense_categoryController.getCategoryBId);
expense_categoryRouter.put('/api/categories/:id/update', expense_categoryController.updateCategory);
expense_categoryRouter.delete('/api/categories/:id/delete', expense_categoryController.deleteCategory);



module.exports = expense_categoryRouter;
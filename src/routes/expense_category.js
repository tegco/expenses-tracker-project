const express = require('express');
const db = require('../database/db');
const Joi = require('joi');
const expense_categoryRouter = express.Router();
const expense_categoryController = require('../controllers/expense_categoryController');

expense_categoryRouter.get('/api/categories', expense_categoryController.getAllCategories);

module.exports = expense_categoryRouter;
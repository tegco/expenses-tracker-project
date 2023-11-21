const express = require('express');
const db = require('../database/db');
const Joi = require('joi');
const incomeRouter = express.Router();
const incomeController = require('../controllers/incomeController');
const { authenticateToken } = require('../middleware/authMiddleware');

incomeRouter.get('/api/income/:id', incomeController.getIncomeById);
incomeRouter.get('/api/income/:year/:month', authenticateToken, incomeController.getIncomeByMonthAndYear);
incomeRouter.post('/api/income/create', authenticateToken,incomeController.createIncome);
incomeRouter.put('/api/income/:id', authenticateToken, incomeController.updateIncome);
incomeRouter.delete('/api/income/:id', authenticateToken, incomeController.deleteIncome);

module.exports = incomeRouter;


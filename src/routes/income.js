const express = require('express');
const db = require('../database/db');
const Joi = require('joi');
const incomeRouter = express.Router();
const incomeController = require('../controllers/incomeController');

incomeRouter.get('/api/income', incomeController.getUserIncome);
incomeRouter.post('/api/income/create', incomeController.createIncome);
incomeRouter.put('/api/income/update', incomeController.updateIncome);
incomeRouter.delete('api/income/delete', incomeController.deleteIncome);

/* 
/api/incomes/:id: Retrieve a specific income record by ID.
/api/incomes/create: Create a new income record.
/api/incomes/:id/update: Update an existing income record by ID.
/api/incomes/:id/delete: Delete an income record by ID. */

module.exports = incomeRouter;


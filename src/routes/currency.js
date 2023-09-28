const express = require('express');
const db = require('../database/db');
const Joi = require('joi');
const currencyRouter = express.Router();
const currencyController = require('../controllers/currencyController');

currencyRouter.get('/api/currencies',  currencyController.getAllCurrencies);
//currencyRouter.

/* /api/preferences: Manage user-specific settings (e.g., currency preferences). */

module.exports = currencyRouter;
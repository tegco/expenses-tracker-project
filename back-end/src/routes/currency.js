const express = require("express");
const currencyRouter = express.Router();
const currencyController = require("../controllers/currencyController");

currencyRouter.get("/api/currencies", currencyController.getAllCurrencies);

module.exports = currencyRouter;

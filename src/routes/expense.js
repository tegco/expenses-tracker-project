const express = require('express');
const db = require('../database/db');
const Joi = require('joi');
const expenseRouter = express.Router();
const expenseController = require('../controllers/expenseController');

/* /api/expenses: Retrieve a list of all expenses for the authenticated user.
/api/expenses/:id: Retrieve a specific expense by ID.
/api/expenses/create: Create a new expense record.
/api/expenses/:id/update: Update an existing expense by ID.
/api/expenses/:id/delete: Delete an expense by ID. */

expenseRouter.get('/api/expenses', async (req, res) => {
  const userId = req.params.id;
  const expenses = await db.query('SELECT * FROM expense WHERE user_id = $1', [userId]);
});

expenseRouter.get('/api/expenses/:id', (req, res) => {
  const expense = db.find(e => e.id === parseInt(req.params.id));
  if (!expense) return res.status(404).send('The expense with the given ID was not found');
  res.send(expense);
});

expenseRouter.post('/api/expenses', (req, res) => {
  //Input validation
  const result = validateExpense(req.body);

  if(result.error){
    return res.status(400).send(result.error.details[0].message);
  }
  const expense = {
    id: db.length + 1, 
    name : req.body.name,
  };
  db.push(expense);
  res.send(expense);
});

expenseRouter.put('/api/expenses/:id', (req, res) => {
  const expense = db.find(e => e.id === parseInt(req.params.id));

  if (!expense) return res.status(404).send('The expense with the given ID was not found');
 
  const result = validateExpense(req.body);

  if(result.error) return res.status(400).send(result.error.details[0].message);

  expense.name = req.body.name;
  
  res.send(expense);
});

expenseRouter.delete('/api/expenses/:id', (req, res) => {
  const expense = db.find(e => e.id === parseInt(req.params.id));
  console.log("delete" + req.params.id);

  if (!expense) return res.status(404).send('The expense with the given ID was not found');

  const index = db.indexOf(expense);
  db.splice(index, 1); // Remove object from the array
  res.send(expense);
});

function validateExpense(expense){
  const schema = Joi.object({
  name: Joi.string().required(),
  });

  return schema.validate(expense);
}


module.exports = expenseRouter;
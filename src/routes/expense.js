const express = require('express');
const db = require('./src/database/db'); // Import database connection
const Joi = require('joi');
const router = express.Router();

const db = [
  { id: 1, name: 'Expense 1' },
  { id: 2, name: 'Expense 2' },
];

router.get('/', (req, res) => {
  res.send('Hi, Express!');
});

router.get('/api/expenses', (req, res) => {
  res.json(db);
});

router.get('/api/expenses/:id', (req, res) => {
  const expense = db.find(e => e.id === parseInt(req.params.id));
  if (!expense) return res.status(404).send('The expense with the given ID was not found');
  res.send(expense);
});

router.post('/api/expenses', (req, res) => {
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

router.put('/api/expenses/:id', (req, res) => {
  const expense = db.find(e => e.id === parseInt(req.params.id));

  if (!expense) return res.status(404).send('The expense with the given ID was not found');
 
  const result = validateExpense(req.body);

  if(result.error) return res.status(400).send(result.error.details[0].message);

  expense.name = req.body.name;
  
  res.send(expense);
});

router.delete('/api/expenses/:id', (req, res) => {
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


module.exports = router;
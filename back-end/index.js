const express = require('express');
const db = require('./src/database/db');
const passport = require('passport');
const app = express();

// When you deploy this app to a hosting environment the port is dynamically assigned by the hosting environment, 3000 might not be available
// Thats why we use an environment variable
const port = process.env.PORT || 3000; // Desired port number to run the server

app.use(express.json());
app.use(passport.initialize());

// Import your route files
const currencyRouter = require('./src/routes/currency');
const expense_categoryRouter = require('./src/routes/expense_category');
const expenseRouter = require('./src/routes/expense');
const incomeRouter = require('./src/routes/income');
const userRouter = require('./src/routes/user');

// Use the imported route files
app.use('/', currencyRouter);
app.use('/', expense_categoryRouter);
app.use('/', expenseRouter);
app.use('/', incomeRouter);
app.use('/', userRouter);

// Test the database connection
db.one('SELECT 1')
  .then(result => {
    console.log('Database connection successful');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  })
  .finally(() => {
   
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
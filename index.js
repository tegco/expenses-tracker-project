const express = require('express');
const app = express();
const port = 3000; // Desired port number to run the server

// Include (import) the routes defined in "routes.js"
const routes = require('./src/routes/routes');
app.use('/', routes);
const db = require('./src/database/db');

// Test the database connection
db.one('SELECT 1')
  .then(result => {
    console.log('Database connection successful');
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  })
  .finally(() => {
    db.$pool.end(); // Close the database connection
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
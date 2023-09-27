const express = require('express');
const routes = require('./src/routes/routes.js');
const db = require('./src/database/db');
const app = express();

// When you deploy this app to a hosting environment the port is dynamically assigned by the hosting environment, 3000 might not be available
// Thats why we use an environment variable
const port = process.env.PORT || 3000; // Desired port number to run the server

//Ensure that the request body parsing middleware is registered before any routes are defined, which is 
//the correct order for middleware registration in Express.js.
app.use(express.json());
app.use('/', routes);


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
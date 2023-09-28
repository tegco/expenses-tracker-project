const express = require('express');
const db = require('../database/db');
const Joi = require('joi');
const userRouter = express.Router();
const userController = require('../controllers/userController');


/* /api/register: Register a new user.
/api/login: Authenticate and log in a user.
/api/logout: Log out a user.
/api/user/profile: Retrieve or update user profile information. */

userRouter.get('/', (req, res) => {
    res.send('Hi, Express!');
  });

userRouter.get('/api/users', async (req, res) => {
    try {
        // Execute the SQL query to retrieve users from the database
        const users = await db.query("SELECT * FROM user");

        // Send the retrieved users as JSON response
        res.json(users);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

module.exports = userRouter;
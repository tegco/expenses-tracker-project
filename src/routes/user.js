const express = require('express');
const db = require('../database/db');
const Joi = require('joi');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');


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
        const users = await db.query("SELECT * FROM app_user");

        // Send the retrieved users as JSON response
        res.json(users);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

userRouter.post('/api/register', userController.register);
userRouter.post('/api/login', userController.login);
userRouter.get('/api/user/profile', authenticateToken, userController.getProfile);
userRouter.put('/api/user/profile', authenticateToken, userController.updatePassword);
userRouter.post('/api/logout', authenticateToken, userController.logout);

module.exports = userRouter;
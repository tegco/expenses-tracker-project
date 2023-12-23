const express = require('express');
const db = require('../database/db');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

userRouter.get('/', (req, res) => {
    res.send('Hi, Express!');
  });

userRouter.post('/api/register', userController.register);
userRouter.post('/api/login', userController.login);
userRouter.get('/api/user/profile', authenticateToken, userController.getProfile);
userRouter.put('/api/user/profile', authenticateToken, userController.updatePassword);

module.exports = userRouter;
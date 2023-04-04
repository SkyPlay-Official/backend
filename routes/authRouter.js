const express = require('express');
const authController = require("../controllers/authController")
const authenticateToken = require('../middlewares/tokenVerification');

const authRouter = express.Router();

// Register a new user
authRouter.post('/register', authController.registerUser);

// Login user
authRouter.post('/login', authController.loginUser);

// User details
authRouter.get('/me',authenticateToken ,authController.userDetails);

// User details update
authRouter.put('/me',authenticateToken ,authController.updateUser);

// Logout user
authRouter.get('/logout',authenticateToken ,authController.logoutUser);

module.exports = authRouter;

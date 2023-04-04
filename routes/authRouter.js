const express = require('express');
const authController = require("../controllers/authController")

const authRouter = express.Router();

// Register a new user
authRouter.post('/register',authController.registerUser);

// Login user
authRouter.post('/login');

module.exports = authRouter;

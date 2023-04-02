const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

// Register a new user
router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({ message: 'Email already exists' });
      } else {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
  
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          });
        });
      }
    });
  });
  
  // Login user
  router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = { id: user.id, username: user.username, email: user.email };
  
          jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          });
        } else {
          return res.status(400).json({ message: 'Password incorrect' });
        }
      });
    });
  });
  
  module.exports = router;
  
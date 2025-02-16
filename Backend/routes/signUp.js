const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');  
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const users = await User.find(); 
      res.status(200).json({
        message:'Existing users',
        users:users
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  });
  

  router.post('/signup', async (req, res) => {
    try {
      const { password, firstName, lastName, email, role } = req.body;

      if (role !== 'salesperson' && role !== 'superadmin') {
        return res.status(400).json({ message: 'Invalid role specified' });
      }
      let userData = {};
  
      if (role === 'superadmin') {
        const name = `${firstName} ${lastName}`;
        userData = { name, email, password, role };
      } else {
        userData = { firstName, lastName, email, password, role };
      }

  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        ...userData,
        password: hashedPassword,
        role:role || 'salesperson'
      });
  
      await newUser.save();
  
      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  module.exports = router;

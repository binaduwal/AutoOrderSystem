// authRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, contactNumber } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password || !contactNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      username: firstName, // Assuming username is the first name
      password: hashedPassword,
      contactNumber,
      role: 'salesperson',
    });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;

const express = require('express');
const bcrypt = require("bcrypt");
const User = require('../models/userModel');
const connectDB = require('../database/db');

const router = express.Router();

router.post('/create-user', async (req, res) => {
  try {

    const { fullName, email, contactNo, username, password, role, status, address } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      contactNo,
      username,
      password: hashedPassword,
      role,
      status,
      address,
    });

    await user.save();
    return res.json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/update-user', async (req, res) => {
  try {
    await connectDB();

    const { userId, fullName, email, contactNo, username, password, role, status, address } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        email,
        contactNo,
        username,
        password: password ? await bcrypt.hash(password, 10) : undefined,
        role,
        status,
        address,
      },
      { new: true }
    );

    return res.json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

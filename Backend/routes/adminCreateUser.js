const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/AdminModel')
const router = express.Router()

router.post('/create', async (req, res) => {
  const { username, email, password, confirmPassword, status, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const existingUsername = await Admin.findOne({ username });


  if (existingUsername) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      status: status || 'active',  
      role: role || 'salesperson',     });

    await newAdmin.save();

    res.status(201).json({ message: 'created successfully', admin: newAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/admins', async (req, res) => {
    try {
      const admins = await Admin.find(); 
      res.status(200).json({ admins });  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    try {
      const admin = await Admin.findByIdAndDelete(req.params.id);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
      res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });  
  

module.exports = router;

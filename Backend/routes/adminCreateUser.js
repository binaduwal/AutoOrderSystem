const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authMiddleware=require('../middlewares/authMiddleware')


router.post('/create', async (req, res) => {
  const { username, email, password, confirmPassword, status, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const existingUsername = await User.findOne({ username });


  if (existingUsername) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      status: status || 'active',  
      role: role || 'salesperson',     });

    await newUser.save();

    res.status(201).json({ message: 'created successfully', User: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/all',authMiddleware, async (req, res) => {
    try {
      const users = await User.find({ username: { $ne: 'superadmin' } });
      res.status(200).json({ users });  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.get("/:id", async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
  


  router.put('/edit/:id', async (req, res) => {
    const {email, contactNo, address, status, role} = req.body;
    
    try {
      const currentUser = await User.findById(req.params.id);
      if (!currentUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const updateData = {
        username: currentUser.username, 
        email,       
        contactNo,
        address,
        status,
        role,
      };
  
  
      const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, 
        { new: true });
      res.status(200).json({ message: 'updated successfully', user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Update Password Route
router.put('/update-password/:id', async (req, res) => {
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
   

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Incorrect password.' })
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ message: "Login successful", token, role: user.role })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})


module.exports = router;

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Admin = require('../models/AdminModel')  
const router = express.Router()

router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body
  
      const admin = await Admin.findOne({ username })
      if (!admin) {
        return res.status(400).json({ message: 'User not found' })
      }
  
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Incorrect password.' })
      }
  
      const token = jwt.sign(
        { id: user._id, username: admin.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      )
  
      res.json({ message: "Login successful", token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  })


  
module.exports = router
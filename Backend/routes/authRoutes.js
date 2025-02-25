const express = require('express')
const bcrypt = require('bcryptjs')
const Admin = require('../models/AdminModel')
const router = express.Router()

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, contactNumber } = req.body

  if (!firstName || !lastName || !email || !password || !contactNumber) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    const existingUser = await Admin.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new Admin({
      firstName,
      lastName,
      email,
      username: firstName, 
      password: hashedPassword,
      contactNumber,
      role: 'salesperson',
    })

    await newUser.save()
    res.status(201).json({ message: 'User registered successfully.' })
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await Admin.find() 
    res.status(200).json(users) 
  } catch (error) {
    res.status(500).json({ message: 'Server error.' })
  }
})

module.exports = router

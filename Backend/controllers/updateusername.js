const mongoose = require('mongoose')
const User = require('../models/User')

const updateUsernames = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/binaDB')

    const users = await User.find({ username: { $exists: false } }) //returns documents where the field is missing.

    for (const user of users) {
      user.username = user.firstName.toLowerCase()
      await user.save()
    }

    console.log('Usernames updated successfully')
    await mongoose.disconnect()
  } catch (err) {
    console.error('Error updating usernames:', err)
    await mongoose.disconnect()
  }
}

updateUsernames()

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Admin = require('../models/userModel')

const connectDB=require('../database/db')

const seedSuperAdmin = async () => {
  try {
    await connectDB()
    const hashedPassword = await bcrypt.hash("admin@123", 10)

    const existingAdmin = await Admin.findOne({ username: "superadmin" })

    if (existingAdmin) {
      console.log("Super Admin already exists.")
      return mongoose.connection.close()
    }

    const superAdmin = new Admin({
      name: "Super Admin",
      email: "superadmin@example.com",
      password: hashedPassword,
      contactNo: "1234567890",
      username: "superadmin",
      role: "superadmin",
      status: "active"
        })

    await superAdmin.save()
    console.log("Super Admin created successfully!")
    return mongoose.connection.close()
  } catch (error) {
    console.error("Error seeding Super Admin:", error)
  }
}

seedSuperAdmin()

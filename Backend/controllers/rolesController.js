const mongoose = require('mongoose')
const Role = require('../models/RoleModel')
const Permission = require('../models/permissionModel')

exports.createRole = async (req, res) => {
  const { name, display_name, description, permissions } = req.body
  
  try {
    const validPermissions = await Permission.find({ '_id': { $in: permissions } })
    if (validPermissions.length !== permissions.length) {
      return res.status(400).json({ message: 'Invalid permission IDs' })
    }

    
    const role = new Role({
        name,
        display_name,
        description,
        permissions,
    })
  
    await role.save()
    console.log("Role saved in database:", role)
    res.status(201).json({ message: 'Role created successfully', role })
  } catch (error) {
    console.error("Error creating role:", error)
    res.status(500).json({ message: 'Error creating role', error })
  }
}

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find().populate('permissions')
    res.status(200).json(roles)
  } catch (error) {
    console.error("Error fetching roles:", error)
    res.status(500).json({ message: 'Error fetching roles', error })
  }
}

exports.getRoleById = async (req, res) => {
  try {
    console.log("Fetching role ID:", req.params.id) 
    const role = await Role.findById(req.params.id).populate('permissions')

    if (!role) {
      console.log("Role not found for ID:", req.params.id) 
      return res.status(404).json({ error: 'Role not found' })
    }
    res.json(role)
  } catch (error) {
    console.error("Error fetching role:", error) 
    res.status(500).json({ error: 'Server error' })
  }
}

exports.editRole = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' })
    }
    const editedRole = await Role.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('permissions')
  
    if (!editedRole) {
      return res.status(404).json({ error: 'Role not found' })
    }
  
    res.status(200).json({
      message: 'Edited Successfully',
      updatedRole: editedRole,
    })
  } catch (error) {
    console.error("Error updating role:", error)
    res.status(500).json({ error: 'Server Error', message: error.message })
  }
}
exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params
    const deletedRole = await Role.findByIdAndDelete(id)
  
    if (!deletedRole) {
      return res.status(404).json({ error: 'Role not found' })
    }
  
    res.json({ message: "Deleted Successfully" })
  } catch (error) {
    console.error("Error deleting role:", error)
    res.status(500).json({ error: 'Server Error' })
  }
}

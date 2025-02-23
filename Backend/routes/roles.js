const express = require('express');
const router = express.Router();
const Role = require('../models/RoleModel');

router.post('/create', async (req, res) => {
    const { name, display_name, description, permissions } = req.body;
  
    try {
      const role = new Role({
        name,
        display_name,
        description,
        permissions,
      });
  
      await role.save();
      res.status(201).json({ message: 'Role created successfully', 
        role });
        console.log("Role saved in database:", role);
        } catch (error) {
      console.error("Error creating role:", error);
      res.status(500).json({ message: 'Error creating role', error });
    }
});


router.get('/role/all', async (req, res) => {
    try {
      const roles = await Role.find().populate('permissions');
      res.status(200).json(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      res.status(500).json({ message: 'Error fetching roles', error });
    }
  });
  

module.exports = router; 

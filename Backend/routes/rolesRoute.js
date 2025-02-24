const express = require('express');
const router = express.Router();
const Role = require('../models/RoleModel');
const Permission=require('../models/permissionModel')

router.post('/create', async (req, res) => {
    const { name, display_name, description, permissions } = req.body;
  
    try {
      const validPermissions = await Permission.find({ '_id': { $in: permissions } });

      if (validPermissions.length !== permissions.length) {
        return res.status(400).json({ message: 'Invalid permission IDs' });
      }

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


router.get('/all', async (req, res) => {
    try {
      const roles = await Role.find().populate('permissions');
      res.status(200).json(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      res.status(500).json({ message: 'Error fetching roles', error });
    }
  });


  router.put('/edit/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, display_name, description, permissions } = req.body;
  
      const editedRole = await Role.findByIdAndUpdate(
        id,
        { name, display_name, description, permissions },
        { new: true }
      );
  
      if (!editedRole) {
        return res.status(404).json({ error: 'Role not found' });
      }
  
      res.status(200).json({
        message: 'Edited Successfully',
        updatedRole: editedRole 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error', message: error.message });
    }
  });
    

router.delete('/delete/:id',async(req,res)=>{
  try{
    const {id}=req.params
    const deletedroles=await Role.findByIdAndDelete(id)
    if (!deletedroles) {
      return res.status(404).json({ error: 'Role not found'   })
  }
    res.json({ 'message':"Deleted Successfully"})
  }
  catch(error)
  {
    console.error(error)
    res.json({'error':'Server Error'})
  }
})

module.exports = router; 

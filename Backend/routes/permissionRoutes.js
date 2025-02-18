const express = require('express');
const router = express.Router();
const Permission = require('../models/permissionModel');

router.get('/all', async (req, res) => {
    try {
        const permissions = await Permission.find();
        console.log('Permissions fetched:', permissions);  
        res.json(permissions);    
    }
     catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


router.post('/create', async (req, res) => {
  const { name, display_name, description } = req.body;
  try {
    const newPermission = await Permission.create({
      name,
      display_name,
      description
    });
    res.status(201).json(newPermission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

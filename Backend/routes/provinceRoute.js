const express = require('express');
const router = express.Router();
const Province = require('../models/ProvinceModel');

router.post('/create', async (req, res) => {
  try {
    const provinceName = req.body.name.trim().toLowerCase();
    const existingProvince = await Province.findOne({ name: { $regex: new RegExp(`^${provinceName}$`, 'i') } });

    if (existingProvince) {
      return res.status(400).json({ message: 'Province already exists!' });
    }

    const province = new Province({ name: req.body.name });
    await province.save();
    res.status(201).json(province);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const provinces = await Province.find();
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/edit/:id', async (req, res) => {
  try {
    const updatedProvince = await Province.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updatedProvince) 
        return res.status(404).json({ message: 'Province not found' });
    res.json(updatedProvince);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedProvince = await Province.findByIdAndDelete(req.params.id);
    if (!deletedProvince) 
        return res.status(404).json({ message: 'Province not found' });
    res.json({ message: 'Province deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const provinceName = req.params.name.trim().toLowerCase(); 
    const province = await Province.findOne({ name: { $regex: new RegExp(`^${provinceName}$`, 'i') } });  
    res.json({ exists: !!province }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/id/:id', async (req, res) => {
  try {
    const province = await Province.findById(req.params.id);
    if (!province) {
      return res.status(404).json({ message: 'Province not found' });
    }
    res.json(province);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;

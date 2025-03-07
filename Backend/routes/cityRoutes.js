const express = require('express')
const router = express.Router()
const City = require('../models/cityModel')
const Province = require('../models/ProvinceModel') 

router.post('/create', async (req, res) => {
  const { name, provinceName } = req.body
  
  try {
    if (!name || !provinceName) {
      return res.status(400).json({ message: 'City name and province ID are required' })
    }

    const province = await Province.findById(provinceName)
    if (!province) {
      return res.status(404).json({ message: 'Province not found' })
    }

    const newCity = new City({
      name,
      province: province._id
    })

    await newCity.save()
    res.status(201).json(newCity)
  }
  catch (error) {
    console.error('Error creating city:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})  
router.get('/all', async (req, res) => {
  try {
    const cities = await City.find().populate('province', 'name')  
    res.json(cities)
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/id/:id', async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate('province', 'name')
    if (!city) {
      return res.status(404).json({ message: 'City not found' })
    }
    res.json(city)
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put('/edit/:id', async (req, res) => {
  try {
    const { name, provinceId } = req.body

    const city = await City.findById(req.params.id)
    if (!city) {
      return res.status(404).json({ message: 'City not found' })
    }

    if (provinceId) {
      const province = await Province.findById(provinceId)
      if (!province) {
        return res.status(404).json({ message: 'Province not found' })
      }
      city.province = province._id 
    }

    if (name) {
      city.name = name
    }
    const updatedCity = await City.findById(req.params.id).populate('province')
    res.status(200).json(updatedCity)
    }
     catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedCity = await City.findByIdAndDelete(req.params.id)
    if (!deletedCity) {
      return res.status(404).json({ message: 'City not found' })
    }
    res.json({ message: 'City deleted successfully' })
  }
   catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:name', async (req, res) => {
  try {
    const cityName = req.params.name.trim().toLowerCase()
    const city = await City.findOne({ name: { $regex: new RegExp(`^${cityName}$`, 'i') } })  
    res.json({ exists: !!city }) 
  }
   catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router

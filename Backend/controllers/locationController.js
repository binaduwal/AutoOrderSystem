const Location = require('../models/locationModel')

exports.createLocation = async (req, res) => {
  try {
    const { province, city, address } = req.body;
    const newLocation = new Location({ province, city, address });
    await newLocation.save();

    const populatedLocation = await Location.findById(newLocation._id)
      .populate({
        path: 'province',
        select: 'name',
        model: 'Province'
      })
      .populate({
        path: 'city',
        select: 'name',
        model: 'City'
      });

    res.status(201).json(populatedLocation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find()
      .populate({
        path: 'province',
        select: 'name', 
        model: 'Province'
      })
      .populate({
        path: 'city',
        select: 'name',
        model: 'City'
      });
      
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)
    if (!location) return res.status(404).json({ message: 'Location not found' })
    res.json(location)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.updateLocation = async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedLocation) return res.status(404).json({ message: 'Location not found' })
    res.json({ message: 'Location updated', updatedLocation })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteLocation = async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id)
    if (!deletedLocation) return res.status(404).json({ message: 'Location not found' })
    res.json({ message: 'Location deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.getLocationsByCityId = async (req, res) => {
  try {
    const locations = await Location.find({ city: req.params.cityId })
      .populate('province', 'name')
      .populate('city', 'name')
      
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

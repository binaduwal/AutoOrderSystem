const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/create', locationController.createLocation);
router.get('/all', locationController.getAllLocations);
router.get('/city/:cityId', locationController.getLocationsByCityId);
router.get('/:id', locationController.getLocationById);
router.put('/edit/:id', locationController.updateLocation);
router.delete('/delete/:id', locationController.deleteLocation);

module.exports = router;
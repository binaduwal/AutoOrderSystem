const express = require('express');
const router = express.Router();
const roleController = require('../controllers/rolesController');

router.post('/create', roleController.createRole);
router.get('/all', roleController.getAllRoles);
router.put('/edit/:id', roleController.editRole);
router.delete('/delete/:id', roleController.deleteRole);

module.exports = router;


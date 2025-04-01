const express = require('express')
const router = express.Router()
const permissionController = require('../controllers/permissionController')

router.get('/all', permissionController.getAllPermissions)
router.get('/:id', permissionController.getPermissionById)
router.post('/create', permissionController.createPermission)
router.put('/edit/:id', permissionController.updatePermission)
router.delete('/delete/:id', permissionController.deletePermission)

module.exports = router

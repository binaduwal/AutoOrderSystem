const express = require("express")
const router = express.Router()
const salespersonController = require("../controllers/salespersonController")

router.post('/create', salespersonController.create)
router.get('/all', salespersonController.getAll)
router.get('/:id', salespersonController.getById)
router.put('/edit/:id', salespersonController.update)
router.delete('/delete/:id', salespersonController.delete)

module.exports = router

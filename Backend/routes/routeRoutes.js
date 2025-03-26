const express = require("express")
const router = express.Router()
const routeController = require("../controllers/routeController")

router.post('/create', routeController.createRoute)
router.get('/all', routeController.getAllRoutes)
router.get('/:id', routeController.getRouteById)
router.put('/edit/:id', routeController.updateRoute)
router.delete('/delete/:id', routeController.deleteRoute)

module.exports = router

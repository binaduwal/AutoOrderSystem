const express = require("express")
const router = express.Router()
const orderController = require("../controllers/orderController")


router.post('/create',orderController.createOrder)      
router.get('/all',orderController.getAllOrders)      
router.get('/:id',orderController.getOrderById)  
router.put('/edit/:id',orderController.updateOrder)  
router.delete('/delete/:id',orderController.deleteOrder)

module.exports = router
const Order = require('../models/orderModel')

// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body)
        await newOrder.save()
        res.status(201).json({ message: 'Order created successfully', order: newOrder })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('partyID salesmanID paymentModeID')
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Get an order by ID
exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('partyID salesmanID paymentModeID')
        if (!order) return res.status(404).json({ message: 'Order not found' })
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Update an order by ID
exports.updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' })
        res.status(200).json({ message: 'Order updated successfully', order: updatedOrder })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete an order by ID
exports.deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id)
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' })
        res.status(200).json({ message: 'Order deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

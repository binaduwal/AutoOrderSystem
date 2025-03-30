const Order = require('../models/orderModel')
const OrderItem = require('../models/orderItemModel') 

exports.createOrder = async (req, res) => {
  try {
    const { orderItems, ...orderData } = req.body

    const order = new Order(orderData)
    await order.save()

    const itemsWithOrderId = orderItems.map(item => ({
      productId: item.productId,
      price: item.price,
      discount: item.discount,
      qty: item.qty,  
      rate: item.rate,
      vatAmount: item.vatAmount,
      totalAmount: item.totalAmount,
      orderId: order._id
    }))
    
    const createdItems = await OrderItem.insertMany(itemsWithOrderId)

    order.orderItems = createdItems.map(item => item._id)
    await order.save()

    res.status(201).json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ error: 'Order creation failed' })
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

exports.getOrderById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id)
        .populate('partyID', 'partyName')
        .populate('salesmanID', 'name')
        .populate('paymentModeID', 'name')
        .populate({
          path: 'orderItems',
          populate: {
            path: 'productId',
            select: 'name maxSellingPrice vatable maxDiscount'
          }
        })
  
      if (!order) return res.status(404).json({ message: 'Order not found' })
      
      res.status(200).json(order)
    } catch (error) {
      console.error('Error fetching order:', error)
      res.status(500).json({ error: 'Server error while fetching order' })
    }
  }
  
  // Update an order by ID
  exports.updateOrder = async (req, res) => {
    try {
      const { orderItems, ...orderData } = req.body
      
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        orderData,
        { new: true }
      )
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' })
      }
  
      const updatePromises = orderItems.map(async (item) => {
        return OrderItem.findByIdAndUpdate(
          item._id,
          {
            productId: item.productId,
            price: item.price,
            qty: item.quantity,
            discount: item.discount,
            rate: item.rate,
            vatAmount: item.vat,
            totalAmount: item.amount
          },
          { new: true }
        )
      })
  
      await Promise.all(updatePromises)
  
      res.status(200).json({
        message: 'Order updated successfully',
        order: await Order.findById(req.params.id)
          .populate('partyID')
          .populate('salesmanID')
          .populate('paymentModeID')
          .populate({
            path: 'orderItems',
            populate: { path: 'productId' }
          })
      })
    } catch (error) {
      console.error('Error updating order:', error)
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

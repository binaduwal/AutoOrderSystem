const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  const { productName, quantity, price, customerName } = req.body;
  const salespersonId = req.user.id;
  
  if (!productName || !quantity || !price || !customerName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newOrder = new Order({
      productName,
      quantity,
      price,
      customerName,
      salespersonId,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

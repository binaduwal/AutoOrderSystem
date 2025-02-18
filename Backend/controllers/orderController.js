const Order = require('../models/orderItemModel');

exports.createOrder = async (req, res) => {
  const {price,quantity,rate  } = req.body;
  
  try {
    const newOrder = new Order({
      qty,
      price,
      rate,
      discount,
      vatAmount
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};

const orderSchema = new mongoose.Schema({
    orderNumber: {
      type: String,
      unique: true, 
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId, // 
      unique: true, 
    },
    productName: String,
    quantity: Number,
    price: Number,
    customerName: String,
    salespersonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled'],
      default: 'pending',
    },
  }, { timestamps: true });
  
  const Order = mongoose.model('Order', orderSchema);
  
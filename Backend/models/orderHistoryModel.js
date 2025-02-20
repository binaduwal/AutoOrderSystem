import mongoose from 'mongoose';

const OrderHistorySchema = new mongoose.Schema({
  orderID: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }, 
  orderStatusID: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderStatus', required: true }, 
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: { type: Date, default: Date.now },
}, { timestamps: true });

const OrderHistory = mongoose.model('OrderHistory', OrderHistorySchema);
export default OrderHistory;

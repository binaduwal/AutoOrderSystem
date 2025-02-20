const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  routename: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive' ], 
    required: true, 
  }
}, { timestamps: true }); 

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;

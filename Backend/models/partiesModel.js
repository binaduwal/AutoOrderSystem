const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partySchema = new Schema({
  partyName: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  provinceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province', 
    required: false,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'City',
    required: false,
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Location',
    required: false,
  },
  vatPan: {
    type: String,
    enum: ['vat', 'pan'],
    required: true,
  },
  vatPanNo: {
    type: String,
    required: true,
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route', 
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  partyGroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PartyGroup', 
    required: true,
  },
}
)

const Party = mongoose.model('Party', partySchema)

module.exports = Party

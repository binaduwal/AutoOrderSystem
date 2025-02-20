const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country', 
    required: true,
  },
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State', 
    required: true,
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District', 
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  vatPan: {
    type: String,
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
}, { timestamps: true });

const Party = mongoose.model('Party', partySchema);

module.exports = Party;

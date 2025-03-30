const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partyGroupSchema = new Schema({
  partyGroupName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive' ], 
    required: true, 
  }
}) 

const PartyGroup = mongoose.model('PartyGroup', partyGroupSchema)

module.exports = PartyGroup

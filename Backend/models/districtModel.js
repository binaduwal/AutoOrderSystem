const mongoose = require('mongoose')
const Schema = mongoose.Schema

const districtSchema = new Schema({
  districtName: {
    type: String,
    required: true,
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'Country', 
    required: true,
  },
}, { timestamps: true })

const District = mongoose.model('District', districtSchema)

module.exports = District

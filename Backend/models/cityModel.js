const mongoose = require('mongoose')
const Schema = mongoose.Schema

const citySchema = new Schema({
  cityName: {
    type: String,
    required: true,
  },
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District', 
    required: true,
  },
}, { timestamps: true })

const City = mongoose.model('City', citySchema)

module.exports = City

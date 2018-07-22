const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saleSchema = new Schema({
  id: Schema.ObjectId,
  price: Number,
  type: String,
  date: Date,
})

module.exports = mongoose.model('sale', saleSchema)

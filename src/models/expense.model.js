const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
  id: Schema.ObjectId,
  price: Number,
  date: Date,
  category: String,
  description: String,
})

module.exports = mongoose.model('expense', expenseSchema)

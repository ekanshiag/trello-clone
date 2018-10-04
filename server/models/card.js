const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  title: String,
  desc: String,
  dueDate: Date,
  Checklist: [String],
  list: mongoose.SchemaTypes.ObjectId
})

module.exports = mongoose.model('Card', cardSchema)

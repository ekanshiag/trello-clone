const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  title: String,
  board: mongoose.SchemaTypes.ObjectId,
  cards: [mongoose.SchemaTypes.ObjectId]
})

module.exports = mongoose.model('lists', listSchema)

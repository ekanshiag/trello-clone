const mongoose = require('mongoose')

const listSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  title: String,
  board: {type: mongoose.SchemaTypes.ObjectId, ref: 'Board'},
  cards: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Card'}]
})

module.exports = mongoose.model('List', listSchema)

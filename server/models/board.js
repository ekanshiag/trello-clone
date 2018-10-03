const mongoose = require('mongoose')

const boardSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  title: String,
  lists: [mongoose.SchemaTypes.ObjectId]
})

module.exports = mongoose.model('Board', boardSchema)

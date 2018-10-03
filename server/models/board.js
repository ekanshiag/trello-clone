const mongoose = require('mongoose')

const boardSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  title: String
})

module.exports = mongoose.model('Board', boardSchema)

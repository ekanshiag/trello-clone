const mongoose = require('mongoose')

const boardSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  title: String,
  lists: [{type: mongoose.SchemaTypes.ObjectId, ref: 'List'}]
})

module.exports = mongoose.model('Board', boardSchema)

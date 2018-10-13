const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
  _id: mongoose.SchemaTypes.ObjectId,
  title: String,
  desc: String,
  dueDate: Date,
  checklist: [{
    task: String,
    done: Boolean
  }],
  list: {type: mongoose.SchemaTypes.ObjectId, ref: 'List'}
})

module.exports = mongoose.model('Card', cardSchema)

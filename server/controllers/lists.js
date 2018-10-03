const Lists = require('../models/lists')
const mongoose = require('mongoose')

exports.getLists = function (req, res) {
  let id = req.params.id
  Lists.find()
    .where('board', id)
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.createList = function (req, res) {
  const list = new Lists({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    board: req.params.id
  })

  list.save()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

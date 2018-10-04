const Lists = require('../models/lists')
const mongoose = require('mongoose')
const Card = require('../models/card')

exports.createCard = function (req, res) {
  const newCard = new Card({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    list: req.params.id
  })
  Lists.update({_id: req.params.id}, {$push: {cards: newCard._id}})
    .exec()
    .then(newCard.save())
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.deleteList = function (req, res) {
  Lists.remove({_id: req.params.id})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

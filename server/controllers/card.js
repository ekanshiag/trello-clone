const Card = require('../models/card')

exports.getCard = function (req, res) {
  Card.find()
    .where('_id', req.params.id)
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.updateCard = function (req, res) {
  Card.update({_id: req.params.id}, {$set: req.body})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.deleteCard = function (req, res) {
  Card.remove({_id: req.params.id})
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

const Card = require('../models/card')
const List = require('../models/lists')

exports.getCard = function (req, res) {
  Card.find()
    .where('_id', req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.updateCard = function (req, res) {
  if (req.body.hasOwnProperty('list')) return moveCard(req, res)
  Card.update({_id: req.params.id}, {$set: req.body})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.deleteCard = function (req, res) {
  Card.remove({_id: req.params.id})
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

let moveCard = function (req, res) {
  Card.findById({_id: req.params.id})
    .populate('list')
    .then(result => {
      return result.list
    })
    .then(oldList => {
      oldList.cards = oldList.cards.filter(card => card.toString() !== req.params.id)
      return oldList.save()
    })
    .then(() => Card.update({_id: req.params.id}, {$set: req.body}))
    .then(() => List.update({_id: req.body.list}, {$push: {cards: req.params.id}}))
    .then(result => {
      res.status(200).json(result)
    })
}

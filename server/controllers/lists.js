const Lists = require('../models/lists')
const mongoose = require('mongoose')
const Card = require('../models/card')

exports.getCards = function (req, res) {
  Card.find()
    .where('list', req.params.id)
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.createCard = function (req, res) {
  const newCard = new Card({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    list: req.params.id
  })

  Lists.update({_id: req.params.id}, {$push: {cards: newCard._id}})
    .then(newCard.save())
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.updateList = function (req, res) {
  Lists.update({_id: req.params.id}, {$set: req.body})
    .then(result => {
      res.status(200).json(result)
    })
}

exports.deleteList = function (req, res) {
  Lists.findById({_id: req.params.id})
    .populate('board')
    .populate('cards')
    .then(list => {
      return list
    })
    .then(list => {
      let board = list.board
      board.lists = board.lists.filter(l => l.toString() !== req.params.id)
      board.save()
      let cards = list.cards
      cards.forEach(card => {
        card.remove()
      })
      return list
    })
    .then(list => {
      list.remove()
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

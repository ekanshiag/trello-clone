const mongoose = require('mongoose')
const Board = require('../models/board')
const Lists = require('../models/lists')

exports.getBoards = function (req, res) {
  Board.find()
    .exec()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.createBoard = function (req, res) {
  const board = new Board({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title
  })

  board.save()
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.getBoard = function (req, res) {
  let id = req.params.id
  Board.findById(id)
    .populate({
      path: 'lists',
      populate: 'cards'
    })
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.deleteBoard = function (req, res) {
  Board.remove({_id: req.params.id})
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
    .then(Board.update({id: req.params.id}, {$push: {lists: list._id}}))
    .then(result => {
      res.status(200).json(result)
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

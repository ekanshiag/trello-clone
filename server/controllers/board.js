const mongoose = require('mongoose')
const Board = require('../models/board')

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

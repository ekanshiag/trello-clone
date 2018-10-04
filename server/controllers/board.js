const mongoose = require('mongoose')
const Board = require('../models/board')
const Lists = require('../models/lists')
const Cards = require('../models/card')

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

exports.getLists = function (req, res) {
  let id = req.params.id
  Lists.find()
    .where('board', id)
    .lean()
    .exec()
    .then(function (result) {
      let boardLists = []
      result.forEach(list => {
        let newList = getListCards(list)
        boardLists.push(newList)
      })
      return Promise.all(boardLists)
        .then(result => {
          return result
        })
    })
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

function getListCards (list) {
  return Cards.find()
    .where('list', list._id)
    .exec()
    .then(card => {
      list.cards = card
      return list
    })
}

const express = require('express')
const router = express.Router()
const boardController = require('../controllers/board')

router.get('/', boardController.getBoards)
router.post('/', boardController.createBoard)
router.get('/:id', boardController.getLists)
router.post('/:id', boardController.createList)
router.delete('/:id', boardController.deleteBoard)

module.exports = router

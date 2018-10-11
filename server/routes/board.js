const express = require('express')
const router = express.Router()
const boardController = require('../controllers/board')

router.get('/', boardController.getBoards)
router.post('/', boardController.createBoard)
router.get('/:id', boardController.getBoard)
router.put('/:id', boardController.updateBoard)
router.delete('/:id', boardController.deleteBoard)
router.post('/:id/lists', boardController.createList)

module.exports = router

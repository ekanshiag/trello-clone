const express = require('express')
const router = express.Router()
const boardController = require('../controllers/board')

router.get('/', boardController.getBoards)
router.post('/', boardController.createBoard)

module.exports = router
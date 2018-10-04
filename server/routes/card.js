const express = require('express')
const router = express.Router()
const cardController = require('../controllers/card')

router.get('/:id', cardController.getCard)
router.put('/:id', cardController.updateCard)
router.delete('/:id', cardController.deleteCard)

module.exports = router

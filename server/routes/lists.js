const express = require('express')
const router = express.Router()
const listsController = require('../controllers/lists')

router.post('/:id/card', listsController.createCard)
router.delete('/:id', listsController.deleteList)

module.exports = router

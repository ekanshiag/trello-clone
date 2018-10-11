const express = require('express')
const router = express.Router()
const listsController = require('../controllers/lists')

router.get('/:id/card', listsController.getCards)
router.post('/:id/card', listsController.createCard)
router.put('/:id', listsController.updateList)
router.delete('/:id', listsController.deleteList)

module.exports = router

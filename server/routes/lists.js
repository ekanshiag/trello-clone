const express = require('express')
const router = express.Router()
const listsController = require('../controllers/lists')

router.get('/:id', listsController.getLists)
router.post('/:id', listsController.createList)

module.exports = router

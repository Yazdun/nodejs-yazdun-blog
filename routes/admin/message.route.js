const express = require('express')
const router = express.Router()
const {
  getAllMessages,
  deleteMessage,
} = require('../../controllers/admin/message.ctrl')

router.get('/', getAllMessages)
router.delete('/delete/:id', deleteMessage)

module.exports = router

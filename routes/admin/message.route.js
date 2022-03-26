const express = require('express')
const router = express.Router()
const {
  getAllMessages,
  deleteMessage,
  countUnreadMessages,
} = require('../../controllers/admin/message.ctrl')

router.get('/', getAllMessages)
router.delete('/delete/:id', deleteMessage)
router.get('/unreads', countUnreadMessages)

module.exports = router

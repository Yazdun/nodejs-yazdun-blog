const express = require('express')
const router = express.Router()
const { createMessage } = require('../../controllers/public/message.ctrl')

router.post('/create', createMessage)

module.exports = router

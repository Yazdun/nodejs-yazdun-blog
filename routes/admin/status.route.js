const express = require('express')
const router = express.Router()
const { status } = require('../../controllers/admin/status.ctrl')

router.get('/', status)

module.exports = router

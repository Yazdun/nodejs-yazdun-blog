const { Message } = require('../../models')
const { StatusCodes } = require('http-status-codes')

const createMessage = async (req, res) => {
  const message = await Message.create(req.body)
  res.status(StatusCodes.CREATED).json({ message })
}

module.exports = {
  createMessage,
}

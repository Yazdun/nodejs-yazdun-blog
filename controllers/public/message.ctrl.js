const { Message } = require('../../models')
const { StatusCodes } = require('http-status-codes')

const createMessage = async (req, res) => {
  const data = await Message.create(req.body)
  res.status(StatusCodes.CREATED).json({ data })
}

module.exports = {
  createMessage,
}

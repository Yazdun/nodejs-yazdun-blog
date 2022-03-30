const { Message } = require('../../models')
const { StatusCodes } = require('http-status-codes')

const getAllMessages = async (req, res) => {
  const messages = await Message.find().sort('createdAt')
  messages.reverse()
  await Message.updateMany({}, { $set: { isRead: true } })
  res.status(StatusCodes.OK).json({ messages })
}

const deleteMessage = async (req, res) => {
  const {
    params: { id: messageId },
  } = req

  const message = await Message.findOneAndRemove({ _id: messageId })
  if (!message) throw new NotFoundError(`this message doesn't exist`)

  res.status(StatusCodes.OK).send()
}

module.exports = {
  getAllMessages,
  deleteMessage,
}

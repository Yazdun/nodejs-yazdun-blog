const { Message } = require('../../models')
const { StatusCodes } = require('http-status-codes')

const getAllMessages = async (req, res) => {
  const data = await Message.find().sort('createdAt')
  data.reverse()
  await Message.updateMany({}, { $set: { isRead: true } })
  res.status(StatusCodes.OK).json({ data })
}

const deleteMessage = async (req, res) => {
  const {
    params: { id: messageId },
  } = req

  const data = await Message.findOneAndRemove({ _id: messageId })
  if (!data) throw new NotFoundError(`this message doesn't exist`)

  res.status(StatusCodes.OK).send()
}

const countUnreadMessages = async (req, res) => {
  const data = await Message.countDocuments({ isRead: false })
  res.status(StatusCodes.OK).json({ data })
}

module.exports = {
  getAllMessages,
  deleteMessage,
  countUnreadMessages,
}

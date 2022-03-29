const { Post, Message } = require('../../models')
const { StatusCodes } = require('http-status-codes')

// get status
const status = async (req, res) => {
  const messagesCount = await Message.countDocuments({ isRead: false })
  const draftsCount = await Post.countDocuments({ isDraft: true })
  res.status(StatusCodes.OK).json({ status: { draftsCount, messagesCount } })
}

module.exports = {
  status,
}

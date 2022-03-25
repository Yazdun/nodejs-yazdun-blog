const { User } = require('../../models')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../../errors')

const register = async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res
    .status(StatusCodes.CREATED)
    .json({ user: { username: user.username }, token })
}

const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password)
    throw new BadRequestError('username and password are required')

  const user = await User.findOne({ username })
  if (!user)
    throw new UnauthenticatedError('username or password is not correct')

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect)
    throw new UnauthenticatedError('username or password is not correct')

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user: { username: user.username },
    token,
  })
}

module.exports = {
  register,
  login,
}

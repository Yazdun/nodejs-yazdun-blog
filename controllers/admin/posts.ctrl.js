const { Post } = require('../../models')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../../errors')

// create new post
const createPost = async (req, res) => {
  const data = await Post.create(req.body)
  res.status(StatusCodes.CREATED).json({ data })
}

// update a post
const updatePost = async (req, res) => {
  const {
    params: { id: postId },
  } = req

  const data = await Post.findOneAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!data) throw new NotFoundError(`this post doesn't exist`)
  res.status(StatusCodes.OK).json({ data })
}

// delete a post
const deletePost = async (req, res) => {
  const {
    params: { id: postId },
  } = req

  const data = await Post.findOneAndRemove({ _id: postId })
  if (!data) throw new NotFoundError(`this post doesn't exist`)

  res.status(StatusCodes.OK).send()
}

// get a post
const getSinglePost = async (req, res) => {
  const {
    params: { id: postId },
  } = req

  const data = await Post.findOne({ _id: postId })
  if (!data) throw new NotFoundError(`this post doesn't exist`)

  res.status(StatusCodes.OK).json({ data })
}

// get all posts
const getAllPosts = async (req, res) => {
  const data = await Post.find().sort('createdAt')
  data.reverse()
  res.status(StatusCodes.OK).json({ data })
}

// post visibility
const updatePostVisibility = async (req, res) => {
  const {
    params: { id: postId },
    query: { status },
  } = req

  const post = await Post.findOneAndUpdate(
    { _id: postId },
    { isDraft: status ? status : false },
    {
      new: true,
      runValidators: true,
    },
  )
  if (!post) throw new NotFoundError(`this post doesn't exist`)
  res.status(StatusCodes.OK).json({ data: post.isDraft })
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePostVisibility,
}

const { Post } = require('../../models')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../../errors')

// create new post
const createPost = async (req, res) => {
  const post = await Post.create(req.body)
  res.status(StatusCodes.CREATED).json({ post })
}

// update a post
const updatePost = async (req, res) => {
  const {
    params: { id: postId },
  } = req

  const post = await Post.findOneAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!post) throw new NotFoundError(`this post doesn't exist`)
  res.status(StatusCodes.OK).json({ post })
}

// delete a post
const deletePost = async (req, res) => {
  const {
    params: { id: postId },
  } = req

  const post = await Post.findOneAndRemove({ _id: postId })
  if (!post) throw new NotFoundError(`this post doesn't exist`)

  res.status(StatusCodes.OK).send()
}

// get a post
const getSinglePost = async (req, res) => {
  const {
    params: { id: postId },
  } = req

  const post = await Post.findOne({ _id: postId })
  if (!post) throw new NotFoundError(`this post doesn't exist`)

  res.status(StatusCodes.OK).json({ post })
}

// get all posts
const getAllPosts = async (req, res) => {
  const {
    query: { isDraft },
  } = req
  const posts = await Post.find({ isDraft: isDraft ? isDraft : false }).sort(
    'createdAt',
  )
  posts.reverse()
  res.status(StatusCodes.OK).json({ posts })
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

const countDraftedPosts = async (req, res) => {
  // CODE GOES HERE
}

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePostVisibility,
  countDraftedPosts,
}

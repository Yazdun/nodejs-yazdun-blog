const { StatusCodes } = require('http-status-codes')
const { Post } = require('../../models')
const { shuffle } = require('../../utils')

const getAllPosts = async (req, res) => {
  const posts = await Post.find({ isDraft: false }, [
    'title',
    'image',
    'description',
    'updatedAt',
    'createdAt',
    'readingTime',
  ]).sort('createdAt')
  posts.reverse()
  res.status(StatusCodes.OK).json({ posts })
}

const getRandomPosts = async (req, res) => {
  const {
    params: { id: postId },
    query: { count },
  } = req
  const data = await Post.find({ isDraft: false }, [
    'title',
    'image',
    'description',
    'createdAt',
    'readingTime',
  ])

  const posts = data
    .filter(post => {
      return post._id.toString() !== postId
    })
    .slice(0, count ? count : 2)

  shuffle(posts)

  res.status(StatusCodes.OK).json({ posts })
}

const getSinglePost = async (req, res) => {
  const {
    params: { id: postId },
  } = req

  const post = await Post.findOne({ _id: postId, isDraft: false })
  if (!post) throw new NotFoundError(`this post doesn't exist`)

  const data = await Post.find({ isDraft: false }, [
    'title',
    'image',
    'description',
    'createdAt',
    'readingTime',
  ])

  shuffle(data)

  const suggestions = data
    .filter(post => {
      return post._id.toString() !== postId
    })
    .slice(0, 2)

  res.status(StatusCodes.OK).json({ post: { ...post._doc, suggestions } })
}

const getLatestPosts = async (req, res) => {
  const {
    query: { count },
  } = req

  const data = await Post.find({ isDraft: false }, [
    'title',
    'image',
    'description',
    'createdAt',
    'readingTime',
  ]).sort('createdAt')
  data.reverse()

  const posts = data.slice(0, count ? count : 2)

  res.status(StatusCodes.OK).json({ posts })
}

module.exports = {
  getAllPosts,
  getRandomPosts,
  getSinglePost,
  getLatestPosts,
}

const express = require('express')
const router = express.Router()
const {
  getAllPosts,
  getRandomPosts,
  getSinglePost,
  getLatestPosts,
} = require('../../controllers/public/posts.ctrl')

router.get('/all', getAllPosts)
router.get('/random', getRandomPosts)
router.get('/:id', getSinglePost)
router.get('/latest', getLatestPosts)

module.exports = router

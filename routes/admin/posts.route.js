const express = require('express')
const router = express.Router()
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePostVisibility,
} = require('../../controllers/admin/posts.ctrl')

router.get('/', getAllPosts)
router.post('/create', createPost)
router.patch('/update/:id', updatePost)
router.delete('/delete/:id', deletePost)
router.get('/find/:id', getSinglePost)
router.patch('/visibility/:id', updatePostVisibility)

module.exports = router

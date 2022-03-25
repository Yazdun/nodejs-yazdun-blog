const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      minlength: [3, 'title must be at least 3 characters'],
      maxlength: [50, 'title must be less than 50 characters'],
    },
    shortTitle: {
      type: String,
      required: [true, 'title is required'],
      maxlength: [50, 'title must be less than 50 characters'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      minlength: [3, 'describtion must be at least 3 characters'],
    },
    content: {
      type: String,
      required: [true, 'content is required'],
      minlength: [3, 'describtion must be at least 3 characters'],
    },
    category: {
      enum: ['personal', 'frontend', 'backend', 'blockchain'],
      type: String,
    },
    tags: {
      type: [String],
    },
    image: String,
    twitterUrl: String,
    codepen: String,
    codesandbox: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('Post', PostSchema)

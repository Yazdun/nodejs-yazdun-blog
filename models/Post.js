const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      minlength: [3, 'title must be at least 3 characters'],
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
      minlength: [10, 'describtion must be at least 3 characters'],
    },
    keywords: String,
    isDraft: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: [true, 'image is required'],
    },
    readingTime: String,
    twitter: String,
    codepen: String,
    codesandbox: String,
    youtube: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('Post', PostSchema)

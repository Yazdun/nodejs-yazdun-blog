const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      minlength: [3, 'title must be at least 3 characters'],
      maxlength: [50, 'title must be less than 50 characters'],
    },
    subtitle: {
      type: String,
      required: [true, 'subtitle is required'],
      minlength: [3, 'subtitle must be at least 3 characters'],
      maxlength: [50, 'subtitle must be less than 50 characters'],
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
      required: [true, 'category is required'],
      enum: [
        'personal',
        'frontend',
        'backend',
        'fullstack',
        'blockchain',
        '3D modeling',
      ],
      type: String,
    },
    keywords: {
      type: [String],
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    image: String,
    twitterUrl: String,
    codepen: String,
    codesandbox: String,
  },
  { timestamps: true },
)

module.exports = mongoose.model('Post', PostSchema)

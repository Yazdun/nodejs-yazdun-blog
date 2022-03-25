const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'your name is required'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'your email is required'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'email address is invalid',
    ],
  },
  message: {
    type: String,
    required: [true, 'message is required'],
  },
})

module.exports = mongoose.model('Message', MessageSchema)

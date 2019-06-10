const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  content: String,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

const Blogcomment = mongoose.model('Blogcomment', blogSchema)

exports.Blogcomment = Blogcomment

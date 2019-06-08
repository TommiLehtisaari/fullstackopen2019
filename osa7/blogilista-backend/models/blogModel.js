const mongoose = require('mongoose')
const Joi = require('joi')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

const validateBlog = blog => {
  const schema = {
    title: Joi.string().required(),
    author: Joi.string().required(),
    url: Joi.string().required(),
    likes: Joi.number().default(0)
  }
  return Joi.validate(blog, schema)
}

exports.Blog = Blog
exports.validate = validateBlog

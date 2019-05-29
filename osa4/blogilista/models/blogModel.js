const mongoose = require('mongoose')
const config = require('config')

const mongoUrl = config.get('mongo_url')
mongoose.connect(mongoUrl, { useNewUrlParser: true })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)

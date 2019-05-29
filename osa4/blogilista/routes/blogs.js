const router = require('express').Router()
const Blog = require('../models/blogModel')

router.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.send(blogs)
  })
})

router.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).send(result)
  })
})

module.exports = router

const router = require('express').Router()
const { Blog, validate } = require('../models/blogModel')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.send(blogs)
})

router.post('/', async (req, res) => {
  const { value, error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const blog = new Blog(value)
  const savedBlog = await blog.save()
  res.status(201).send(savedBlog)
})

module.exports = router

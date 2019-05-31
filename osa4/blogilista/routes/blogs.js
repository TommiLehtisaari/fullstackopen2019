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

router.delete('/:id', async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.params.id)
  if (!blog) return res.status(404).send('blog with given id not found')

  res.send(204).end()
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(404).send('blog with given id not found')

  const newBlog = {
    title: req.body.title || blog.title,
    author: req.body.author || blog.author,
    url: req.body.url || blog.url,
    likes: req.body.likes || blog.likes
  }

  const result = await Blog.findByIdAndUpdate(req.params.id, newBlog, { new: true })
  res.status(200).send(result)
})

module.exports = router

const router = require('express').Router()
const { Blog, validate } = require('../models/blogModel')
const { User } = require('../models/userModel')
const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })
    .populate('comments', { content: 1 })
  res.send(blogs)
})

router.post('/', auth, async (req, res) => {
  const { value, error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  const user = await User.findById(req.user.id)
  value.user = user._id

  const blog = new Blog(value)
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  // could not find a better way to populate userinfo
  const blogById = await Blog.findById(savedBlog.id.toString())
    .populate('user', {
      username: 1,
      name: 1,
      id: 1
    })
    .populate('comments', { content: 1 })
  res.status(201).send(blogById)
})

router.delete('/:id', auth, async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(404).send('blog with given id not found')

  if (req.user.id.toString() === blog.user.toString()) {
    await blog.remove()
    return res.sendStatus(204)
  }
  res.send(403)
})

router.put('/like/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(404).send('blog with given id not found')

  blog.likes += 1
  await blog.save()

  const result = await Blog.findById(req.params.id)
    .populate('user', {
      username: 1,
      name: 1,
      id: 1
    })
    .populate('comments', { content: 1 })

  res.status(200).send(result)
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
    .populate('user', { username: 1, name: 1, id: 1 })
    .populate('comments', { content: 1 })

  res.status(200).send(result)
})

module.exports = router

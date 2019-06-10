const router = require('express').Router()
const { Blogcomment } = require('../models/blogcommentModel')
const { Blog } = require('../models/blogModel')

router.post('/:id', async (req, res) => {
  const id = req.params.id
  const content = req.body.content
  if (!content) return res.status(400).send('content required')

  const blog = await Blog.findById(id)
  if (!blog) return res.status(404).send(`blog with id: ${id} not found.`)

  const comment = new Blogcomment({ content, blog: blog._id })
  blog.comments = blog.comments.concat(comment._id)
  await blog.save()
  await comment.save()
  res.send(comment)
})

module.exports = router

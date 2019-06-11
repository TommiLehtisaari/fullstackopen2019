const router = require('express').Router()
const { Blog } = require('../models/blogModel')
const { Blogcomment } = require('../models/blogcommentModel')
const { User } = require('../models/userModel')

router.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await Blogcomment.deleteMany({})
  await User.deleteMany({})
  res.status(204).end()
})

module.exports = router

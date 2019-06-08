const router = require('express').Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { User, validate } = require('../models/userModel')

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
  res.send(users)
})

router.post('/', async (req, res, next) => {
  const { value, error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  user = new User(_.pick(value, ['username', 'name', 'password']))
  const saltRounds = 10
  user.password = await bcrypt.hash(user.password, saltRounds)

  try {
    const saved = await user.save()
    const token = saved.generateJWT()
    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .end()
  } catch (exeption) {
    next(exeption)
  }
})

module.exports = router

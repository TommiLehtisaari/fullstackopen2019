const router = require('express').Router()
const Joi = require('joi')
const bcrypt = require('bcrypt')
const { User } = require('../models/userModel')

router.post('/', async (req, res) => {
  const { value, error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  let user = await User.findOne({ username: value.username })
  if (!user) return res.status(400).send('Invalid username.')

  const validPassword = await bcrypt.compare(value.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid password.')

  const token = user.generateJWT()
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .end()
})

function validate(user) {
  const schema = {
    username: Joi.string()
      .min(5)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(100)
      .required()
  }

  return Joi.validate(user, schema)
}

module.exports = router

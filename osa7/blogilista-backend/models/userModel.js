const uniqueValidator = require('mongoose-unique-validator')
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')
const Joi = require('joi')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, minlength: 3, maxlength: 50, unique: true },
  name: { type: String, minlength: 3, maxlength: 100, required: true },
  password: { type: String, required: true },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
    delete returnObject.password
  }
})

userSchema.methods.generateJWT = function() {
  const token = jwt.sign(
    {
      username: this.username,
      name: this.name,
      id: this._id
    },
    config.get('jwt_secret')
  )
  return token
}

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

const validateUser = user => {
  const schema = {
    username: Joi.string()
      .min(3)
      .max(50)
      .required(),
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),
    password: Joi.string()
      .min(3)
      .max(100)
      .required()
  }
  return Joi.validate(user, schema)
}

exports.User = User
exports.validate = validateUser

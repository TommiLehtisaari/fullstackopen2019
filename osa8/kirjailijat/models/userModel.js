const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  favouriteGenre: {
    type: String
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  }
}).plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)

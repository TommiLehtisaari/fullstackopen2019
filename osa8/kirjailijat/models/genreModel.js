const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
}).plugin(uniqueValidator)

module.exports = mongoose.model('Genre', schema)

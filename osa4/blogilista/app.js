const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('./utils/logger')
const blogs = require('./routes/blogs')
const users = require('./routes/users')
const login = require('./routes/login')
const { unknownEndpoint, errorHandler } = require('./middleware/exeptionHandlers')
const app = express()

logger.info('connecting to', config.get('mongo_url'))

mongoose
  .connect(config.get('mongo_url'), { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogs)
app.use('/api/users', users)
app.use('/api/login', login)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app

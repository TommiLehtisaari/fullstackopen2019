const express = require('express')
const cors = require('cors')
const blogs = require('./routes/blogs')
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogs)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`NODE_ENV=${process.env.NODE_ENV}`)
  const config = require('config')
  console.log(config)
})

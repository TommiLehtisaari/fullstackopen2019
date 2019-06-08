const _ = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  return blogs.reduce((totalLikes, entry) => {
    return totalLikes + entry.likes
  }, 0)
}

const favoriteBlog = blogs => {
  const result = blogs.reduce((max, entry) => {
    return max.likes > entry.likes ? max : entry
  }, 0)
  const { title, author, likes } = result
  return { title, author, likes }
}

const mostBlogs = blogs => {
  const result = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({ author: key, blogs: value.length }))
    .reduce((max, entry) => {
      return max.blogs > entry.blogs ? max : entry
    })
    .value()
  return result
}

const mostLikes = blogs => {
  const result = _.chain(blogs)
    .groupBy('author')
    .map((value, key) => ({ author: key, likes: totalLikes(value) }))
    .reduce((max, entry) => {
      return max.likes > entry.likes ? max : entry
    })
    .value()
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

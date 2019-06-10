import http from './httpService'
import Joi from 'joi'

const baseUrl = '/api/blogs'

const getAll = () => {
  return http.get(baseUrl)
}

const create = blog => {
  return http.post(baseUrl, blog)
}

const addLike = blog => {
  const url = `${baseUrl}/like/${blog.id}`
  return http.put(url)
}

const remove = blog => {
  const url = `${baseUrl}/${blog.id}`
  return http.delete(url)
}

const addComment = (blog, comment) => {
  const url = `/api/comments/${blog.id}`
  return http.post(url, comment)
}

const validate = blog => {
  const schema = {
    title: Joi.string().required(),
    author: Joi.string().required(),
    url: Joi.string().required()
  }
  return Joi.validate(blog, schema)
}

export default { getAll, create, addLike, remove, validate, addComment }

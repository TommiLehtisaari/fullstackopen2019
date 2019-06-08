import http from './httpService'

const baseUrl = '/api/blogs'

const getAll = () => {
  return http.get(baseUrl)
}

const create = blog => {
  return http.post(baseUrl, blog)
}

const addLike = blog => {
  blog.likes += 1
  const url = `${baseUrl}/${blog.id}`
  return http.put(url, blog)
}

const remove = blog => {
  const url = `${baseUrl}/${blog.id}`
  return http.delete(url)
}

export default { getAll, create, addLike, remove }

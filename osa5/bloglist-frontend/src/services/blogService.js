import http from './httpService'

const baseUrl = '/api/blogs'

const getAll = () => {
  return http.get(baseUrl)
}

const create = blog => {
  return http.post(baseUrl, blog)
}

export default { getAll, create }

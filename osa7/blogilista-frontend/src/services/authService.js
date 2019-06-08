import jwtDecode from 'jwt-decode'
import http from './httpService'

const apiEndpoint = '/api/login'
const storageKey = 'token'

const login = async (username, password) => {
  try {
    const result = await http.post(apiEndpoint, { username, password })
    localStorage.setItem(storageKey, result.headers['x-auth-token'])
    http.setJWT(getJWT())
    return result
  } catch (exeption) {
    return exeption
  }
}

const logout = () => {
  localStorage.removeItem(storageKey)
}

const getUser = () => {
  try {
    const jwt = localStorage.getItem(storageKey)
    return jwtDecode(jwt)
  } catch (exeption) {
    return null
  }
}

const getJWT = () => {
  return localStorage.getItem(storageKey)
}

export default {
  login,
  logout,
  getUser,
  getJWT
}

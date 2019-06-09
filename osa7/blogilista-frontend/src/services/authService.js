import http from './httpService'

const apiEndpoint = '/api/login'

const login = async user => {
  try {
    const response = await http.post(apiEndpoint, user)
    return response
  } catch (exeption) {
    return exeption
  }
}

export default {
  login
}

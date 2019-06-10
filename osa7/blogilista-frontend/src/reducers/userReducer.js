import userService from '../services/userService'
import http from '../services/httpService'
import jwtDecode from 'jwt-decode'

export const initUsers = () => {
  return async dispatch => {
    const { data } = await userService.getAll()
    dispatch({ type: 'INIT_USERS', data })
  }
}

export const createUser = user => {
  return async dispatch => {
    const response = await userService.create(user)
    const token = response.headers['x-auth-token']
    http.setJWT(token)
    dispatch({ type: 'SET_CURRENT_USER', data: token })
    const decoded = jwtDecode(response.headers['x-auth-token'])
    decoded.blogs = []
    dispatch({ type: 'CREATE_USER', data: decoded })
  }
}

let user = {}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    case 'CREATE_USER':
      return state.concat(action.data)
    case 'CREATE_BLOG':
      user = state.find(u => u.id === action.data.user.id)
      user.blogs = user.blogs.concat(action.data)
      return state.map(u => (u.id !== user.id ? u : user))
    default:
      return state
  }
}

export default reducer

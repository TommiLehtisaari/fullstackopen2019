import jwtDecode from 'jwt-decode'
import http from '../services/httpService'
import authService from '../services/authService'

export const setCurrentUser = token => {
  return { type: 'SET_CURRENT_USER', data: token }
}

export const removeCurrentUser = () => {
  return { type: 'REMOVE_CURRENT_USER ' }
}

export const login = user => {
  return async dispatch => {
    const response = await authService.login(user)
    if (response.headers) {
      const token = response.headers['x-auth-token']
      http.setJWT(token)
      dispatch(setCurrentUser(token))
    } else {
      return new Error('Invalid username or password')
    }
  }
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      http.setJWT(action.data)
      const user = jwtDecode(action.data)
      user.token = action.data
      return user
    case 'REMOVE_CURRENT_USER':
      return {}
    default:
      return state
  }
}

export default reducer

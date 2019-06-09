import blogService from '../services/blogService'

export const initBlogs = () => {
  return async dispatch => {
    const { data } = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    default:
      return state
  }
}

export default reducer

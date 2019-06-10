import blogService from '../services/blogService'
import { setError } from './notificationReducer'

export const initBlogs = () => {
  return async dispatch => {
    const { data } = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const { error } = blogService.validate(blog)
    if (error) {
      dispatch(setError(error.details[0].message, 5))
      return new Error('400 - bad request')
    }
    const { data } = await blogService.create(blog)
    dispatch({ type: 'CREATE_BLOG', data })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const { data } = await blogService.addLike(blog)
    dispatch({ type: 'LIKE_BLOG', data })
  }
}

export const addBlogComment = (blog, comment) => {
  return async dispatch => {
    const { data } = await blogService.addComment(blog, comment)
    dispatch({ type: 'COMMENT_BLOG', data })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return state.concat(action.data)
    case 'LIKE_BLOG':
      return state.map(b => (b.id !== action.data.id ? b : action.data))
    case 'COMMENT_BLOG':
      return state.map(b => {
        if (b.id !== action.data.blog) {
          return b
        } else {
          b.comments = b.comments.concat(action.data)
          return b
        }
      })
    default:
      return state
  }
}

export default reducer

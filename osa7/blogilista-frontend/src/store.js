import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogReducer'
import activePageReducer from './reducers/activePageReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import authReducer from './reducers/authReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  activePage: activePageReducer,
  notification: notificationReducer,
  users: userReducer,
  currentUser: authReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store

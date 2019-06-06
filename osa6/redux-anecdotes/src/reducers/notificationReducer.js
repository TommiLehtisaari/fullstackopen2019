export const displayNotification = () => {
  return { type: 'DISPLAY_NOTIFICATION' }
}

export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' }
}

export const setNotificationTimeout = seconds => {
  return async dispatch => {
    dispatch(displayNotification())
    setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)
  }
}

const initNotification = {
  content: '',
  style: { display: 'none', border: 'solid', padding: 10, borderWidth: 1 }
}

const reducer = (state = initNotification, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return { ...state, content: `New anecdote created: ${action.data.content}` }
    case 'VOTE':
      return { ...state, content: `Anecdote was voted: '${action.data.content}'` }
    case 'DISPLAY_NOTIFICATION':
      return { ...state, style: { ...state.style, display: '' } }
    case 'HIDE_NOTIFICATION':
      return { ...state, style: { ...state.style, display: 'none' } }
    default:
      return state
  }
}

export default reducer

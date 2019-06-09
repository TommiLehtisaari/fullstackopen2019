const styles = {
  info: {
    display: 'none',
    border: 'solid',
    borderColor: 'green',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    marginBottom: 15,
    color: 'green'
  },
  warning: {
    display: 'none',
    border: 'solid',
    borderColor: 'red',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    marginBottom: 15,
    color: 'red'
  }
}

export const displayNotification = () => {
  return { type: 'DISPLAY_NOTIFICATION' }
}

export const hideNotification = () => {
  return { type: 'HIDE_NOTIFICATION' }
}

export const setNotification = content => {
  return { type: 'SET_NOTIFICATION', data: content }
}

export const setNotificationTimeout = (content, seconds) => {
  return async dispatch => {
    dispatch(setNotification(content))
    dispatch(displayNotification())
    setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)
  }
}

export const setInfo = (content, seconds) => {
  return async dispatch => {
    dispatch(setStyle(styles.info))
    dispatch(setNotificationTimeout(content, seconds))
  }
}

export const setError = (content, seconds) => {
  return async dispatch => {
    dispatch(setStyle(styles.warning))
    dispatch(setNotificationTimeout(content, seconds))
  }
}

export const setStyle = style => {
  return { type: 'SET_STYLE', data: style }
}

const initNotification = {
  content: '',
  style: styles.info
}

const reducer = (state = initNotification, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, content: action.data }
    case 'SET_STYLE':
      return { ...state, style: action.data }
    case 'DISPLAY_NOTIFICATION':
      return { ...state, style: { ...state.style, display: '' } }
    case 'HIDE_NOTIFICATION':
      return { ...state, style: { ...state.style, display: 'none' } }
    default:
      return state
  }
}

export default reducer

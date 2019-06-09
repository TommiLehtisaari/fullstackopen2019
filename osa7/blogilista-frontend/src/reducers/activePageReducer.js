export const setActivePage = page => {
  return dispatch => {
    dispatch({ type: 'SET_ACTIVEPAGE', data: page })
  }
}

const reducer = (state = 'home', action) => {
  switch (action.type) {
    case 'SET_ACTIVEPAGE':
      return action.data
    default:
      return state
  }
}

export default reducer

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      let newState = { ...state }
      newState.good++
      return newState
    case 'OK':
      newState = { ...state }
      newState.ok++
      return newState
    case 'BAD':
      newState = { ...state }
      newState.bad++
      return newState
    case 'ZERO':
      return { good: 0, ok: 0, bad: 0 }
    default:
      return state
  }
}

export default counterReducer

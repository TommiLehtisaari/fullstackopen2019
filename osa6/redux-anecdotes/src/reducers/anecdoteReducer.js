import { getAll, create, update } from '../services/anecdoteService'

export const initAnecdotes = () => {
  return async dispatch => {
    const { data } = await getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const { data } = await create({ content, votes: 0 })
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}

export const voteById = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const voteByObject = object => {
  const { id, content } = object
  return async dispatch => {
    const { data } = await update({ id, content, votes: (object.votes += 1) })
    dispatch({
      type: 'VOTE',
      data
    })
  }
}

const sortByVotes = anecdotes => {
  return anecdotes.sort((a, b) => {
    if (a.votes < b.votes) return 1
    // This prevents anecdotes to jump on UI if equal amount of votes
    else if (a.votes === b.votes) {
      return a.id < b.id ? 1 : -1
    } else {
      return -1
    }
  })
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return sortByVotes(state.concat(action.data))
    case 'VOTE':
      const id = action.data.id
      const voteDone = action.data
      return sortByVotes(state.map(anecdote => (anecdote.id !== id ? anecdote : voteDone)))
    default:
      return sortByVotes(state)
  }
}

export default reducer

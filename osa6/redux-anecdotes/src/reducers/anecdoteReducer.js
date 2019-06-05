const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = anecdote => {
  return {
    type: 'NEW_ANECDOTE',
    data: {
      content: anecdote
    }
  }
}

export const voteById = id => {
  return {
    type: 'VOTE',
    data: { id }
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

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return sortByVotes(state.concat(asObject(action.data.content)))
    case 'VOTE':
      const id = action.data.id
      const toVote = state.find(anecdote => id === anecdote.id)
      const voteDone = { ...toVote, votes: (toVote.votes += 1) }
      return sortByVotes(state.map(anecdote => (anecdote.id !== id ? anecdote : voteDone)))
    default:
      return sortByVotes(state)
  }
}

export default reducer

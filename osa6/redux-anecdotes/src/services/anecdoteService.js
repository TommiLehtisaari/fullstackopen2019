import axios from 'axios'

const apiEndpoint = '/anecdotes'

export const getAll = () => {
  return axios.get(apiEndpoint)
}

export const create = anecdote => {
  return axios.post(apiEndpoint, anecdote)
}

export const update = anecdote => {
  const url = `${apiEndpoint}/${anecdote.id}`
  return axios.put(url, anecdote)
}

import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationTimeout } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const newAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotificationTimeout(5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={e => newAnecdote(e)}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createAnecdote, setNotificationTimeout }
)(AnecdoteForm)

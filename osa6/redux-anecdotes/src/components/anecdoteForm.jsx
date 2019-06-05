import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const newAnecdote = event => {
    event.preventDefault()
    props.createAnecdote(event.target.anecdote.value)
    event.target.anecdote.value = ''
    props.displayNotification()
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={event => newAnecdote(event)}>
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
  { createAnecdote, displayNotification, hideNotification }
)(AnecdoteForm)

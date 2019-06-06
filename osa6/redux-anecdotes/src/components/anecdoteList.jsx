import React from 'react'
import { connect } from 'react-redux'
import { voteByObject } from '../reducers/anecdoteReducer'
import { setNotificationTimeout } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const vote = anecdote => {
    props.voteByObject(anecdote)
    props.setNotificationTimeout(5)
  }

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
  return anecdotes.filter(n => n.content.includes(filter))
}

const mapStateToProps = state => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteByObject,
  setNotificationTimeout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

import React from 'react'
import { connect } from 'react-redux'
import { voteByObject } from '../reducers/anecdoteReducer'
import { displayNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = props => {
  const vote = anecdote => {
    props.voteByObject(anecdote)
    props.displayNotification()
    setTimeout(() => {
      props.hideNotification()
    }, 5000)
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
  displayNotification,
  hideNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

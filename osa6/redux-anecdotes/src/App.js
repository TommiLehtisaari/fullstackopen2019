import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notificaton from './components/Notification'
import Filter from './components/filter'

const App = props => {
  useEffect(() => {
    props.initAnecdotes()
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notificaton />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default connect(
  null,
  { initAnecdotes }
)(App)

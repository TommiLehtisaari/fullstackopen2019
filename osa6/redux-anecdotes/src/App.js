import React from 'react'
import AnecdoteForm from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notificaton from './components/Notification'
import Filter from './components/filter'

const App = () => {
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

export default App

import React, { useState } from 'react'
import { useField } from '../hooks/field'

const Login = ({ handleSubmit }) => {
  const username = useField('text')
  const password = useField('password')
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const doSubmit = event => {
    event.preventDefault()
    username.reset()
    password.reset()
    handleSubmit({ username: username.value, password: password.value })
  }

  return (
    <React.Fragment>
      <form style={showWhenVisible} onSubmit={event => doSubmit(event)}>
        <div>
          <input {...username} placeholder="username" reset={null} />
        </div>
        <div>
          <input {...password} placeholder="password" reset={null} />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>kirjaudu</button>
        </div>
        <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>peruuta</button>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Login

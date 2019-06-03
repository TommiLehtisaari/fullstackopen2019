import React, { useState } from 'react'

const Login = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const doSubmit = event => {
    event.preventDefault()
    handleSubmit({ username, password })
    setUsername('')
    setPassword('')
  }
  return (
    <React.Fragment>
      <form style={showWhenVisible} onSubmit={event => doSubmit(event)}>
        <div>
          <input
            onChange={({ target }) => setUsername(target.value)}
            placeholder="Username"
            value={username}
            type="text"
            name="username"
          />
        </div>
        <div>
          <input
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            placeholder="password"
            type="password"
            name="password"
          />
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

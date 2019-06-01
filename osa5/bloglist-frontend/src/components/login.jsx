import React, { useState } from 'react'

const Login = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const doSubmit = event => {
    event.preventDefault()
    handleSubmit({ username, password })
    setUsername('')
    setPassword('')
  }
  return (
    <React.Fragment>
      <form onSubmit={event => doSubmit(event)}>
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
        <button type="submit">login</button>
      </form>
    </React.Fragment>
  )
}

export default Login

import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { login } from '../reducers/authReducer'
import { setError } from '../reducers/notificationReducer'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const response = await props.login({ username, password })
    if (response) return props.setError(response.message, 5)
    props.history.push('/')
  }

  return (
    <Form onSubmit={event => handleSubmit(event)}>
      <Form.Field>
        <label>Username</label>
        <input id="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

const mapDispatchToProps = { login, setError }

export default connect(
  null,
  mapDispatchToProps
)(Login)

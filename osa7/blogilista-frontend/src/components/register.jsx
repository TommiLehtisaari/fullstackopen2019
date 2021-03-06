import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { setError, setInfo } from '../reducers/notificationReducer'
import { createUser } from '../reducers/userReducer'
import userService from '../services/userService'

const Register = props => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async event => {
    event.preventDefault()
    const user = { username, name, password }
    const { error } = userService.validate(user)
    if (error) return props.setError(error.details[0].message, 5)

    await props.createUser(user)
    props.history.push('/home')
  }

  return (
    <div>
      <Form onSubmit={event => handleSubmit(event)}>
        <Form.Field>
          <label>Username</label>
          <input id="username" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Name</label>
          <input
            id="name"
            placeholder="Firstname Lastname"
            onChange={e => setName(e.target.value)}
          />
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
        <Form.Field>
          <Checkbox label="I agree to the Terms and Conditions" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default connect(
  null,
  { setError, setInfo, createUser }
)(Register)

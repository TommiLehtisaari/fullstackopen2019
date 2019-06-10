import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addBlogComment } from '../reducers/blogReducer'
import { Form, Button } from 'semantic-ui-react'

const BlogCommentForm = props => {
  const [comment, setComment] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    props.addBlogComment(props.blog, { content: comment })
    setComment('')
  }

  return (
    <Form onSubmit={event => handleSubmit(event)}>
      <Form.Field>
        <label>Add New Comment</label>
        <input value={comment} name="comment" onChange={e => setComment(e.target.value)} />
      </Form.Field>
      <Button type="submit">submit</Button>
    </Form>
  )
}

const mapDispatchToProps = {
  addBlogComment
}

export default connect(
  null,
  mapDispatchToProps
)(BlogCommentForm)

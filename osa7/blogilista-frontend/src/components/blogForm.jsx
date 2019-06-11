import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = props => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [visible, setVisible] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    const blog = { title, author, url }
    const error = await props.createBlog(blog)
    if (error) return

    setTitle('')
    setAuthor('')
    setUrl('')
    setVisible(false)
  }

  if (!visible) return <button onClick={() => setVisible(true)}>create blog</button>

  return (
    <Form onSubmit={event => handleSubmit(event)}>
      <Form.Field>
        <label>Title</label>
        <input
          id="title"
          value={title}
          placeholder="Title"
          onChange={e => setTitle(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Author</label>
        <input
          id="author"
          value={author}
          placeholder="Author"
          onChange={e => setAuthor(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>URL</label>
        <input id="url" value={url} placeholder="URL" onChange={e => setUrl(e.target.value)} />
      </Form.Field>
      <Button type="submit">Submit</Button>
    </Form>
  )
}

export default connect(
  null,
  { createBlog }
)(BlogForm)

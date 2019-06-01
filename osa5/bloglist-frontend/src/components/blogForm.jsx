import React, { useState } from 'react'
import Joi from 'joi'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const doSubmit = event => {
    event.preventDefault()
    const blog = { title, author, url }
    const { error } = validate(blog)
    if (error) return alert(error.details[0].message)
    handleSubmit(blog)
  }

  const validate = blog => {
    const schema = {
      title: Joi.string().required(),
      author: Joi.string().required(),
      url: Joi.string().required()
    }
    return Joi.validate(blog, schema)
  }

  return (
    <React.Fragment>
      <h2>Create new</h2>
      <form onSubmit={event => doSubmit(event)}>
        <div>
          <input
            onChange={({ target }) => setTitle(target.value)}
            type="text"
            placeholder="Title"
            name="title"
          />
        </div>
        <div>
          <input
            onChange={({ target }) => setAuthor(target.value)}
            type="text"
            placeholder="Author"
            name="author"
          />
        </div>
        <div>
          <input
            onChange={({ target }) => setUrl(target.value)}
            type="text"
            placeholder="url"
            name="url"
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </React.Fragment>
  )
}

export default BlogForm

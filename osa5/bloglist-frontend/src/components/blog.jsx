import React, { useState } from 'react'
import PropTypes from 'prop-types'
import authService from '../services/authService'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [small, setSmall] = useState(true)

  const toggle = () => {
    setSmall(!small)
  }

  if (small) {
    return (
      <div className="blog" onClick={() => toggle()}>
        {blog.title} by {blog.author}
      </div>
    )
  }

  return (
    <div className="blog" onMouseLeave={() => toggle()}>
      <div>
        {blog.title} by {blog.author}
      </div>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes <button onClick={() => handleLike(blog)}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {authService.getUser().id === blog.user.id && (
        <div>
          <button onClick={() => handleRemove(blog)}>delete</button>
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog

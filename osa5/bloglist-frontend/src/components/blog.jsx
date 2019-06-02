import React, { useState } from 'react'
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
      <div>{blog.title}</div>
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

export default Blog

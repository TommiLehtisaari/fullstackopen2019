import React from 'react'
import { connect } from 'react-redux'

const BlogList = props => {
  return (
    <div>
      <h2>All blogs</h2>
      {props.blogs.map(blog => (
        <div key={blog.id}>
          {blog.title} by {blog.author}
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(BlogList)

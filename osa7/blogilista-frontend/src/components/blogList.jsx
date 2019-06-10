import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'
import BlogItem from './blogItem'

const BlogList = props => {
  return (
    <List celled size="big">
      {props.blogs.map(blog => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </List>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(BlogList)

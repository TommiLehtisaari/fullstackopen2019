import React from 'react'
import { connect } from 'react-redux'
import BlogList from './blogList'
import BlogForm from './blogForm'

const BlogPage = props => {
  return (
    <div>
      <h1>Blogs</h1>
      {props.currentUser.name && <BlogForm />}
      <BlogList />
    </div>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(BlogPage)

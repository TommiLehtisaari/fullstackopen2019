import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { List, Button, Label, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const BlogItem = ({ blog, likeBlog }) => {
  const [visible, setVisible] = useState(false)

  if (!visible) {
    return (
      <List.Item onClick={() => setVisible(!visible)}>
        <List.Header>{blog.title}</List.Header>by {blog.author}
      </List.Item>
    )
  }
  return (
    <List.Item>
      <List.Header>{blog.title}</List.Header>
      <List.Content>
        <Icon name="pencil alternate"></Icon>by {blog.author}
      </List.Content>
      <List.Content>
        <Icon name="share"></Icon>
        {blog.url}
      </List.Content>
      <List.Content>
        <Icon name="user"></Icon>
        added by {blog.user.name}
      </List.Content>
      <Button basic as="div" labelPosition="left">
        <Label as="a" basic pointing="right">
          {blog.likes}
        </Label>
        <Button basic icon onClick={() => likeBlog(blog)}>
          <Icon name="heart" />
          Like
        </Button>
      </Button>
      <Button basic as="div" labelPosition="left">
        <Label as="a" basic pointing="right">
          {blog.comments.length}
        </Label>
        <Button basic icon as={NavLink} to={`/blogs/${blog.id}`}>
          <Icon name="comment" />
          comments
        </Button>
      </Button>
      <Button onClick={() => setVisible(!visible)}>Close</Button>
    </List.Item>
  )
}

const mapDispatachToProps = { likeBlog }

export default connect(
  null,
  mapDispatachToProps
)(BlogItem)

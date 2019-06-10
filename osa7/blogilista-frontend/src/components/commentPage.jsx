import React from 'react'
import { connect } from 'react-redux'
import { Message, Item, Icon } from 'semantic-ui-react'
import BlogCommentForm from './blogCommentForm'

const CommentPage = props => {
  const blog = props.blogs.find(blog => blog.id === props.id)
  if (!blog) return <div>404 - blog not found</div>
  return (
    <div>
      <Message>
        <Message.Header>{blog.title}</Message.Header>
        <Message.Content>by {blog.author}</Message.Content>
        <Message.Content>{blog.comments.length} comments</Message.Content>
        <Message.Content>{blog.likes} likes</Message.Content>
        <Message.Content>posted by {blog.user.name}</Message.Content>
      </Message>
      <div>comments:</div>
      <Item.Group divided>
        {blog.comments.map(comment => (
          <Item key={comment.id}>
            <Item.Content>
              <Icon name="comment" />
              {comment.content}
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
      <BlogCommentForm blog={blog} />
    </div>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(CommentPage)

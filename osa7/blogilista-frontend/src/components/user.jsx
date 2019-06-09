import React from 'react'
import { connect } from 'react-redux'
import { Card, Item } from 'semantic-ui-react'

const User = props => {
  const user = props.users.find(user => user.id === props.id)
  if (!user) return <div>404 - user not found</div>
  console.log(user)
  return (
    <div>
      <h2>User profile</h2>
      <Card
        header={user.name}
        meta={user.username}
        description={`${user.name} has total of ${user.blogs.length} blogs posted.`}
      />
      <h2>Blogs posted by {user.name}</h2>
      <hr />
      <Item.Group divided>
        {user.blogs.map(blog => (
          <Item key={blog.id}>
            <Item.Content>
              <Item.Header as="a">{blog.title}</Item.Header>
              <Item.Meta>by {blog.author}</Item.Meta>
              <Item.Description>More info on: {blog.url}</Item.Description>
              <Item.Extra>{blog.likes} likes</Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </div>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(User)

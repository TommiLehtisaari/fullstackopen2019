import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Header, Table, Label } from 'semantic-ui-react'

const UserList = ({ users }) => {
  return (
    <Table basic="very" className="selectable">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Users</Table.HeaderCell>
          <Table.HeaderCell>Blogs posted</Table.HeaderCell>
          <Table.HeaderCell>User Profile</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map(u => (
          <Table.Row key={u.id}>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>{u.username}</Header.Content>
                <Header.Subheader>{u.name}</Header.Subheader>
              </Header>
            </Table.Cell>
            <Table.Cell>{u.blogs.length}</Table.Cell>
            <Table.Cell>
              <Label as={NavLink} to={`/user/${u.id}`} horizontal>
                Go to profile
              </Label>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps)(UserList)

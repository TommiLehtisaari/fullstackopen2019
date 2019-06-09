import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { setActivePage } from '../reducers/activePageReducer'

const NavBar = props => {
  const { name } = props.currentUser
  const { pathname } = window.location
  return (
    <Menu secondary>
      <Menu.Item as={NavLink} to={'/home'} name="home" active={pathname.includes('/home')} />
      <Menu.Item as={NavLink} to={'/blogs'} name="blogs" active={pathname.includes('/blogs')} />
      <Menu.Item as={NavLink} to={'/users'} name="users" active={props.activePage === 'users'} />
      {!name && (
        <Menu.Menu position="right">
          <Menu.Item
            as={NavLink}
            to={'/login'}
            name="Log in"
            active={pathname.includes('/login')}
          />
          <Menu.Item
            as={NavLink}
            to={'/register'}
            name="register"
            active={pathname.includes('/register')}
          />
        </Menu.Menu>
      )}
      {name && (
        <Menu.Menu position="right">
          <Menu.Item>
            <em>Logged in as {name}</em>
          </Menu.Item>
          <Menu.Item
            as={NavLink}
            to={'/logout'}
            name="logout"
            active={props.activePage === 'logout'}
            onClick={() => props.setActivePage('logout')}
          />
        </Menu.Menu>
      )}
    </Menu>
  )
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = {
  setActivePage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)

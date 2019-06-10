import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { setActivePage } from '../reducers/activePageReducer'

const NavBar = props => {
  const { name } = props.currentUser
  return (
    <Menu secondary>
      <Menu.Item
        as={NavLink}
        to={'/home'}
        name="home"
        active={props.activePage === 'home'}
        onClick={() => props.setActivePage('home')}
      />
      <Menu.Item
        as={NavLink}
        to={'/blogs'}
        name="blogs"
        active={props.activePage === 'blogs'}
        onClick={() => props.setActivePage('blogs')}
      />
      <Menu.Item
        as={NavLink}
        to={'/users'}
        name="users"
        active={props.activePage === 'users'}
        onClick={() => props.setActivePage('users')}
      />
      {!name && (
        <Menu.Menu position="right">
          <Menu.Item
            as={NavLink}
            to={'/login'}
            name="Log in"
            active={props.activePage === 'login'}
            onClick={() => props.setActivePage('login')}
          />
          <Menu.Item
            as={NavLink}
            to={'/register'}
            name="register"
            active={props.activePage === 'register'}
            onClick={() => props.setActivePage('register')}
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

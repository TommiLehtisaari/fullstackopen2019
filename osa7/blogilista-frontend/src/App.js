import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import BlogPage from './components/blogPage'
import BlogList from './components/blogList'
import CommentPage from './components/commentPage'
import NavBar from './components/navBar'
import Register from './components/register.jsx'
import Login from './components/login'
import Logout from './components/logout'
import Notification from './components/notification'
import UserList from './components/userList'
import User from './components/user'

const App = props => {
  useEffect(() => {
    props.initBlogs()
    props.initUsers()
  })

  return (
    <div className="ui container">
      <NavBar />
      <Notification />
      <Switch>
        <Route path="/register" component={Register} />
        <Route exact path="/user/:id" render={({ match }) => <User id={match.params.id} />} />
        <Route path="/users" component={UserList} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/blogs/:id" render={({ match }) => <CommentPage id={match.params.id} />} />
        <Route path="/blogs" component={BlogPage} />
        <Route path="/" component={BlogList} />
      </Switch>
    </div>
  )
}

export default connect(
  null,
  { initBlogs, initUsers }
)(App)

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/login'
import BlogForm from './components/blogForm'
import Message from './components/Message'
import blogService from './services/blogService'
import auth from './services/authService'
import http from './services/httpService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [message, setMessage] = useState()

  useEffect(() => {
    blogService.getAll().then(response => {
      setBlogs(response.data)
    })
    if (auth.getUser) {
      setUser(auth.getUser)
      http.setJWT(auth.getJWT())
    }
  }, [])

  const handleLogin = async credentials => {
    const { response } = await auth.login(credentials.username, credentials.password)
    if (response) return handleMessage({ content: response.data, type: 'error' })
    setUser(auth.getUser)
  }

  const handleLogout = () => {
    auth.logout()
    setUser()
  }

  const handleBlogSubmit = async blog => {
    const { data } = await blogService.create(blog)
    if (data) {
      const content = `A Blog created: ${data.title} by ${data.author}`
      handleMessage({ content, type: 'success' })
      setBlogs(blogs.concat(data))
    }
  }

  const handleMessage = message => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  if (!user) {
    return (
      <React.Fragment>
        <h4>Log in to application</h4>
        <Message message={message} />
        <Login handleSubmit={event => handleLogin(event)} />
      </React.Fragment>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Message message={message} />
      <div>
        {user.name} logged in<button onClick={() => handleLogout()}>logout</button>
      </div>
      <BlogForm handleSubmit={handleBlogSubmit} />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App

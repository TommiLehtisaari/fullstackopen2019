import React, { useState, useEffect } from 'react'
import Blog from './components/blog.jsx'
import Login from './components/login'
import BlogForm from './components/blogForm'
import Message from './components/Message'
import blogService from './services/blogService'
import auth from './services/authService'
import http from './services/httpService'
import authService from './services/authService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [message, setMessage] = useState()

  useEffect(() => {
    blogService.getAll().then(response => {
      const sorted = response.data.sort((a, b) => (a.likes < b.likes ? 1 : -1))
      setBlogs(sorted)
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
      data.user = authService.getUser()
      const content = `A Blog created: ${data.title} by ${data.author}`
      handleMessage({ content, type: 'success' })
      setBlogs(blogs.concat(data))
    }
  }

  const handleLike = async blog => {
    const updatedBlog = await blogService.addLike(blog)
    const findAndReplace = blogs.map(b => {
      return b.id === updatedBlog.id ? updatedBlog : b
    })
    const sorted = findAndReplace.sort((a, b) => (a.likes < b.likes ? 1 : -1))
    setBlogs(sorted)
  }

  const handleBlogRemove = async blog => {
    const dblCheck = window.confirm(`remove blog: ${blog.title} by ${blog.author}`)
    if (!dblCheck) return

    const result = await blogService.remove(blog)
    if (result.status === 204) {
      handleMessage({ content: 'blog removed from the database', type: 'success' })
      const filtered = blogs.filter(b => b.id !== blog.id)
      setBlogs(filtered)
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
      {blogs.map((blog, id) => {
        return (
          <Blog
            key={id}
            blog={blog}
            handleLike={blog => handleLike(blog)}
            handleRemove={blog => handleBlogRemove(blog)}
          />
        )
      })}
    </div>
  )
}

export default App

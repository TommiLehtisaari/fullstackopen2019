import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import decode from 'jwt-decode'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { useApolloClient } from 'react-apollo-hooks'
import { Subscription } from 'react-apollo'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/loginForm'
import Recomenndation from './components/Recommendations'

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      genres {
        value
      }
      author {
        name
      }
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres {
        value
      }
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const App = props => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-token', token))
  }, [])

  const authorsResult = useQuery(ALL_AUTHORS)
  const login = useMutation(LOGIN)
  const createBook = useMutation(CREATE_BOOK)
  const editAuthor = useMutation(EDIT_AUTHOR)

  const handleError = error => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!token) {
    return (
      <LoginForm
        errorMessage={errorMessage}
        login={login}
        setToken={setToken}
        handleError={handleError}
      />
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && (
          <React.Fragment>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>
              recommendation
            </button>
            <button onClick={() => logout()}>log out</button>
            <label>Logged in as {decode(token).username}</label>
          </React.Fragment>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <Authors
        show={page === 'authors'}
        result={authorsResult}
        editAuthor={editAuthor}
      />
      <NewBook show={page === 'add'} createBook={createBook} />
      <Recomenndation show={page === 'recommendations'} client={client} />
      <Books show={page === 'books'} client={client} />
      <Subscription
        subscription={BOOK_ADDED}
        onSubscriptionData={({ subscriptionData }) => {
          const { title, author } = subscriptionData.data.bookAdded
          toast.info(`New Book added: ${title} by ${author.name}`)
        }}
      >
        {() => null}
      </Subscription>
    </div>
  )
}

export default App

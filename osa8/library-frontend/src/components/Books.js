import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'

const BOOKS_BY_GENRE = gql`
  query booksByGenreId($idToSearch: String!) {
    genreById(id: $idToSearch) {
      value
      books {
        title
        published
        author {
          name
        }
      }
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      title
      author {
        name
      }
      genres {
        value
      }
      published
    }
  }
`

const ALL_GENRES = gql`
  {
    allGenres {
      id
      value
    }
  }
`

const Books = ({ show, client }) => {
  if (!show) {
    return null
  }
  const [books, setBooks] = useState(null)
  const [genres, setGenres] = useState(null)
  const [message, setMessage] = useState(
    <div>
      in <b>All genres</b>
    </div>
  )

  useEffect(() => {
    client
      .query({
        query: ALL_BOOKS
      })
      .then(({ data }) => setBooks(data.allBooks))
    client
      .query({
        query: ALL_GENRES
      })
      .then(({ data }) => setGenres(data.allGenres))
  }, [])

  const handleClick = async e => {
    e.preventDefault()
    const { id } = e.target
    if (id === 'all') {
      const { data } = await client.query({
        query: ALL_BOOKS,
        fetchPolicy: 'no-cache'
      })
      setMessage(
        <div>
          in <b>All genres</b>
        </div>
      )

      return setBooks(data.allBooks)
    }

    const { data } = await client.query({
      query: BOOKS_BY_GENRE,
      variables: { idToSearch: id },
      fetchPolicy: 'no-cache'
    })
    setMessage(
      <div>
        in <b>{data.genreById.value}</b>
      </div>
    )
    setBooks(data.genreById.books)
  }

  return (
    <div>
      <h2>Books</h2>
      <div style={{ marginBottom: 10 }}>{message}</div>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books && (
            <React.Fragment>
              {books.map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </React.Fragment>
          )}
        </tbody>
      </table>
      <div>
        {genres && (
          <React.Fragment>
            {genres.map(g => (
              <button key={g.id} id={g.id} onClick={e => handleClick(e)}>
                {g.value}
              </button>
            ))}
          </React.Fragment>
        )}
        <button key="all" id="all" onClick={e => handleClick(e)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books

import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'

const BOOKS_BY_RECOMENDATION = gql`
  query booksByGenreValue($genreValue: String!) {
    genreByValue(value: $genreValue) {
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

const ME = gql`
  {
    me {
      username
      favouriteGenre
    }
  }
`

const Recomenndation = ({ show, client }) => {
  if (!show) {
    return null
  }

  const [books, setBooks] = useState(null)
  const [me, setMe] = useState(null)

  const getRecomendations = async () => {
    const { data } = await client.query({
      query: ME
    })
    setMe(data.me)
    const result = await client.query({
      query: BOOKS_BY_RECOMENDATION,
      variables: { genreValue: data.me.favouriteGenre }
    })
    setBooks(result.data.genreByValue.books)
  }

  useEffect(() => {
    getRecomendations()
  })

  return (
    <div>
      <h2>Recommendations</h2>
      {me && (
        <div style={{ marginBottom: 10 }}>
          books in your favourite genre <b>{me.favouriteGenre}</b>
        </div>
      )}
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
    </div>
  )
}

export default Recomenndation

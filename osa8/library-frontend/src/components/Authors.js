import React from 'react'
import EditAuthor from './editAuthor'

const Authors = ({ show, result, editAuthor }) => {
  if (!show) {
    return null
  } else if (result.loading) {
    return <div>loading...</div>
  }

  const { allAuthors: authors } = result.data

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>author</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor authors={authors} editAuthor={editAuthor} />
    </div>
  )
}

export default Authors

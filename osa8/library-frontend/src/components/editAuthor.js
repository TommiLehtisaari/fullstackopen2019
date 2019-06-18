import React, { useState } from 'react'
import Select from 'react-select'

const EditAuthor = ({ authors, editAuthor }) => {
  const [name, setName] = useState()
  const [born, setBorn] = useState()

  const handleEdit = async () => {
    await editAuthor({ variables: { name, setBornTo: Number(born) } })
  }

  return (
    <div>
      <Select
        onChange={e => setName(e.value)}
        options={authors.map(a => ({ value: a.name, label: a.name }))}
      />
      <input
        onChange={e => setBorn(e.target.value)}
        placeholder="Set Yeat of birth"
      />
      <button onClick={() => handleEdit()}>update author</button>
    </div>
  )
}

export default EditAuthor

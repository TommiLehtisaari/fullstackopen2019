import React from 'react'

const Form = ({ newName, number, onSubmit, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        nimi: <input onChange={onNameChange} value={newName} />
      </div>
      <div>
        numero: <input onChange={onNumberChange} value={number} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

export default Form

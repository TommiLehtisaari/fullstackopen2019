import React from 'react'

const Message = ({ message }) => {
  if (!message) return null
  const { content, type } = message
  return <div className={type || 'error'}>{content}</div>
}

export default Message

import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const { content, style } = props
  return <div style={style}>{content}</div>
}

const mapStateToProps = state => {
  return state.notification
}

export default connect(mapStateToProps)(Notification)

import { useEffect } from 'react'
import { connect } from 'react-redux'
import { removeCurrentUser } from '../reducers/authReducer'

const Logout = props => {
  useEffect(() => {
    props.removeCurrentUser()
    window.location = '/'
  })
  return null
}

const mapDispatchToProps = { removeCurrentUser }

export default connect(
  null,
  mapDispatchToProps
)(Logout)

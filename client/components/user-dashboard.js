import React from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'

const UserDashboard = props => {
  const { user } = props
  return <Dashboard user={user} />
}

const mapState = state => {
  return {
    user: state.user,
  }
}

export default connect(mapState)(UserDashboard)

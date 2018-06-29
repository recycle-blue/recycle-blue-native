import React from 'react'
import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { getMeThunk } from '../store'

class UserDashboard extends React.Component {

  componentDidMount() {
    this.props.getUser(this.props.user.id)
  }

  render() {
    const { user, navigation } = this.props
    return (
      <Dashboard user={user} navigation={navigation} />
    )
  }

}

const mapState = state => {
  return {
    user: state.user,
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: (userId) => dispatch(getMeThunk(userId))
  }
}
export default connect(mapState, mapDispatch)(UserDashboard)

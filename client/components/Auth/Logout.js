import React from 'react'
import { logout } from '../../store'
import { connect } from 'react-redux'

class Logout extends React.Component {

  componentDidMount() {
    this.props.logout()
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.user.id) {
      nextProps.navigation.navigate('Login');
    }
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout)

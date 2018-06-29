import React from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text,
  Button,
  TouchableHighlight,
} from 'react-native'
import { Container, Form, Item, Input, Content } from 'native-base'
import { auth } from '../store'
import { connect } from 'react-redux'
import { devEmail } from '../secrets'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      method: 'login',
      firstName: '',
      lastName: '',
    }
  }

  devLogin = event => {
    this.props.auth(devEmail, '1234', 'login')
  }

  handleSubmit = event => {
    event.preventDefault()
    if (this.state.method === 'login') {
      const { email, password, method } = this.state
      this.props.auth(email, password, method)
    } else {
      const { email, password, method, firstName, lastName } = this.state
      this.props.auth(email, password, method, firstName, lastName)
    }
  }

  render() {
    const { method } = this.state
    const { error } = this.props
    return (
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Image
            style={styles.image}
            source={{
              uri:
                'https://i.pinimg.com/originals/23/05/a6/2305a658b57008997afd9dffa3c91300.png',
            }}
          />
          <Text style={styles.title}>Recycle Blue</Text>
          <Form>
            {method === 'signup' && (
              <View>
                <Item rounded style={styles.padVert}>
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    onChangeText={text => this.setState({ firstName: text })}
                    value={this.state.firstName}
                  />
                </Item>
                <Item rounded style={styles.padVert}>
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    onChangeText={text => this.setState({ lastName: text })}
                    value={this.state.lastName}
                  />
                </Item>
              </View>
            )}
            <Item rounded style={styles.padVert}>
              <Input
                name="email"
                placeholder="Email"
                onChangeText={text => this.setState({ email: text })}
                value={this.state.email}
              />
            </Item>
            <Item rounded style={styles.padVert}>
              <Input
                name="password"
                placeholder="Password"
                onChangeText={text => this.setState({ password: text })}
                value={this.state.password}
              />
            </Item>
          </Form>
          {method === 'login' ? (
            <View>
              <TouchableHighlight
                style={styles.button}
                onPress={this.handleSubmit}
                underlayColor="#fff"
              >
                <Text style={styles.buttonFont}>Login</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => this.setState({ method: 'signup' })}
                underlayColor="#fff"
              >
                <Text style={styles.buttonFont}>Sign Up</Text>
              </TouchableHighlight>
            </View>
          ) : (
            <View>
              <TouchableHighlight
                style={styles.button}
                onPress={this.handleSubmit}
                underlayColor="#fff"
              >
                <Text style={styles.buttonFont}>Sign Up</Text>
              </TouchableHighlight>
              <View>
                <Text>
                  {' '}
                  Already have an account ?
                  <Text
                    onPress={() => this.setState({ method: 'login' })}
                    style={{ textAlign: 'center', color: '#003366' }}
                  >
                    Login
                  </Text>
                </Text>
              </View>
            </View>
          )}
          {error &&
            error.response && (
              <Text style={{ textAlign: 'center' }}>
                {' '}
                {error.response.data}{' '}
              </Text>
            )}
        </Content>
        <TouchableHighlight
          style={styles.devButton}
          onPress={this.devLogin}
          underlayColor="#fff"
        >
          <Text style={styles.buttonFont}>Dev Login</Text>
        </TouchableHighlight>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4fcff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10%',
  },
  padVert: {
    marginTop: 5,
  },
  title: {
    color: '#006D8A',
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  button: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#68a0cf',
    width: '60%',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 1,
    alignSelf: 'center',
  },
  buttonFont: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  devButton: {
    position: 'absolute',
    bottom: 10,
    padding: 10,
    backgroundColor: '#878787',
    width: '60%',
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 1,
    alignSelf: 'center',
  },
})

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.user.error,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    auth: (email, password, method, firstName, lastName) =>
      dispatch(auth(email, password, method, firstName, lastName)).then(res => {
        if (!res) ownProps.navigation.navigate('primaryNav')
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

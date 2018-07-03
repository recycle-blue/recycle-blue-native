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
import { auth } from '../../store'
import { connect } from 'react-redux'
import { devEmail } from '../../secrets'
import { colors } from '../color-palette'

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
          <TouchableHighlight
            // style={styles.devButton}
            onPress={this.devLogin}
            underlayColor={colors.light}
          >
            <Image
              style={styles.image}
              source={{
                uri:
                  'https://i.pinimg.com/originals/23/05/a6/2305a658b57008997afd9dffa3c91300.png',
              }}
            />
          </TouchableHighlight>
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
            <View style={{ marginTop: 15 }}>
              <TouchableHighlight
                style={styles.button}
                onPress={this.handleSubmit}
                underlayColor={colors.white}
              >
                <Text style={styles.buttonFont}>Login</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.button}
                onPress={() => this.setState({ method: 'signup' })}
                underlayColor={colors.white}
              >
                <Text style={styles.buttonFont}>Sign Up</Text>
              </TouchableHighlight>
            </View>
          ) : (
              <View style={{ marginTop: 15 }}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={this.handleSubmit}
                  underlayColor={colors.light}
                >
                  <Text style={styles.buttonFont}>Sign Up</Text>
                </TouchableHighlight>
                <View>
                  <Text style={{ textAlign: 'center' }}>
                    Already have an account?
                    {' '}
                    <Text
                      onPress={() => this.setState({ method: 'login' })}
                      style={{ textAlign: 'center', color: colors.dark }}
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
        {/* <TouchableHighlight
          style={styles.devButton}
          onPress={this.devLogin}
          underlayColor={colors.light}
        >
          <Text style={styles.buttonFont}>Dev Login</Text>
        </TouchableHighlight> */}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10%',
  },
  padVert: {
    marginTop: 5,
    backgroundColor: colors.white
  },
  title: {
    color: colors.dark,
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    paddingBottom: 15,
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  button: {
    marginTop: 5,
    padding: 7,
    backgroundColor: colors.main,
    width: '60%',
    borderRadius: 100,
    borderColor: colors.main,
    borderWidth: 1,
    alignSelf: 'center',
  },
  buttonFont: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  devButton: {
    position: 'absolute',
    bottom: 10,
    padding: 10,
    backgroundColor: colors.midLight,
    width: '60%',
    borderRadius: 100,
    borderColor: colors.midLight,
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

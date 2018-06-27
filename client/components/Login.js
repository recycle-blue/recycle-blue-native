import React from 'react'
import { StyleSheet, Image, View, Dimensions } from 'react-native'
import { Container, Form, Item, Text, Input, Content, Button } from 'native-base'
import { auth } from '../store'
import { connect } from 'react-redux'
import { devEmail } from '../secrets'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      method: 'login'
    }
  }

  devLogin = (event) => {
    this.props.auth(devEmail, '1234', 'login')
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { email, password, method } = this.state
    this.props.auth(email, password, method)
  }
  render() {
    const { method } = this.state
    const { error } = this.props
    return (
      <Container style={styles.container} >
        <Content style={styles.content} >
          <Image
            style={styles.image}
            source={{ uri: 'https://i.pinimg.com/originals/23/05/a6/2305a658b57008997afd9dffa3c91300.png' }}
          />
          <Form>
            <Item rounded style={styles.padVert}>
              <Input name="email" placeholder="Email" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
            </Item>
            <Item rounded style={styles.padVert}>
              <Input name="password" placeholder="Password" onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
            </Item>
          </Form>
          <Button rounded title={method} onPress={this.handleSubmit} style={styles.padVert} >
            <Text>{method}</Text>
          </Button>
          <Button rounded title="Dev Login" onPress={this.devLogin} style={styles.padVert}>
            <Text>Dev Login</Text>
          </Button>
          {error && error.response && <Text> {error.response.data} </Text>}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: '10%',
  },
  padVert: {
    marginTop: 5,
  },
  image: {
    flex: 1,
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: 'blue',
    alignSelf: 'center',
  },
})

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    auth: (email, password, method) =>
      dispatch(auth(email, password, method))
        .then(() => ownProps.navigation.navigate('primaryNav'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


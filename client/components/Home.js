import React from 'react'
import { StyleSheet, Image, Text, View, Button } from 'react-native'
import { Container, Form, Item, Input, Content } from 'native-base';
import {auth} from '../store'
import {connect} from 'react-redux'
import { devEmail } from '../secrets'

class Home extends React.Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password: '',
      method: 'login'
    }
  }

  devLogin = (event) => {
    this.props.auth(devEmail,'1234','login');
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const {email,password,method} = this.state
    this.props.auth(email,password,method);
  }

  render() {
    const { method } = this.state
    const {error} = this.props
    return (
      <Container>
        <Content>
        <Image
          style={styles.image}
          source={{ uri: 'https://i.pinimg.com/originals/23/05/a6/2305a658b57008997afd9dffa3c91300.png' }}
        />
        <Form>
            <Item rounded>
              <Input name="email" placeholder="Email" onChangeText={(text) => this.setState({email: text})} value={this.state.email} />
            </Item>
            <Item rounded>
              <Input name="password" placeholder="Password" onChangeText={(text) => this.setState({password: text})} value={this.state.password} />
            </Item>
          </Form>
          <Button title={method} onPress={this.handleSubmit} />
          <Button title={'Dev Login'} onPress={this.devLogin} />
          {error && error.response && <Text> {error.response.data} </Text>}
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },image: {
    flex: 1,
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = state => {
  return {
    user: state.user,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    auth: (email,password,method) =>
    dispatch(auth(email, password, method))
    .then(()=> ownProps.navigation.navigate('drawerStack'))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)


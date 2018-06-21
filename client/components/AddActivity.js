import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { Container, Header, Title, Body, Label, Content, Form, Item, Input } from 'native-base'
import { connect } from 'react-redux'
import { addActivityThunk } from '../store'

const mapStateToProps = (store) => ({
  type: store.activity.type || "typetest",
  category: store.activity.category || "cattest"
})

const mapDispatchToProps = (dispatch) => ({
  addActivity: (activity) => dispatch(addActivityThunk(activity))
})

class AddActivity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: this.props.type,
      category: this.props.category
    }
  }
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleSubmit = (evt) => {
    evt.preventDefault()
    this.props.addActivity(this.state)
  }
  render() {
    return (
      <Container>
        <Content>
          {/* Image here */}
          <Form>
            <Item rounded>
              <Input name="type" placeholder="Type" onChange={this.handleChange} value={this.state.type} />
            </Item>
            <Item rounded>
              <Input name="category" placeholder="Category" onChange={this.handleChange} value={this.state.category} />
            </Item>
          </Form>
          <Button title='submit' onPress={this.handleSubmit} />
        </Content>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddActivity)
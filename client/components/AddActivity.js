import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { Container, Header, Title, Body, Label, Content, Form, Item, Input } from 'native-base'
import { connect } from 'react-redux'
import { addActivityThunk } from '../store'

const mapStateToProps = (store) => {
  console.log(store)
  return {
    type: store.activity.type || "typetest",
    category: store.activity.category || "cattest",
    qty: store.activity.qty || '1',
    unit: store.activity.unit || 'qty',
    photo: store.activity.photo || 'https://i.ytimg.com/vi/1qT-rOXB6NI/maxresdefault.jpg',
    rawData: store.activity.rawData
  }
}

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
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>This is where the image goes</Text>
            <Image
              style={styles.image}
              source={{ uri: this.props.photo }}
            />
          </View>
          <Form>
            <Item rounded>
              <Input
                name="type"
                placeholder="Type"
                onChange={this.handleChange}
                value={this.state.type}
              />
            </Item>
            <Item rounded>
              <Input
                name="category"
                placeholder="Category"
                onChange={this.handleChange}
                value={this.state.category}
              />
            </Item>
            <View style={styles.qtyInputs}>
              <Item rounded>
                <Input
                  style={styles.halfInput}
                  name="amount"
                  onChange={this.handleChange}
                  value={this.state.qty}
                  keyboardType='numeric'
                />
              </Item>
              <Item rounded>
                <Input
                  style={styles.halfInput}
                  name="unit"
                  placeholder="qty"
                  onChange={this.handleChange}
                  value={this.state.unit}
                />
              </Item>
            </View>
          </Form>
          <Button title='submit' onPress={this.handleSubmit} />
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyInputs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  halfInput: {
    // flex: 1,
    width: 125,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddActivity)
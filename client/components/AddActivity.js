import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import { Container, Content, Form, Item, Input } from 'native-base'
import { connect } from 'react-redux'
import { addActivityThunk, me } from '../store'

const mapStateToProps = (store) => {
  return {
    userId: store.user.id,// || 1,
    name: store.activity.name,// || "bottle",
    category: store.activity.category,// || "Plastic",
    quantity: store.activity.quantity,// || 1,
    unit: store.activity.unit,// || 'qty',
    photo: store.activity.photo,// || 'https://i.ytimg.com/vi/1qT-rOXB6NI/maxresdefault.jpg',
    imageUrl: store.activity.imageUrl,// || 'https://i.ytimg.com/vi/1qT-rOXB6NI/maxresdefault.jpg',
  }
}

const mapDispatchToProps = (dispatch) => ({
  addActivity: (activity) => dispatch(addActivityThunk(activity)),
  refreshUser: (userId) => dispatch(me(userId)),
})

class AddActivity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.userId,
      name: this.props.name,
      category: this.props.category,
      quantity: this.props.quantity,
      imageUrl: this.props.imageUrl,
      dataAsyncToggle: false,
    }
  }
  handleSubmit = async () => {
    await this.props.addActivity(this.state)
    this.props.navigation.navigate('product')
  }
  render() {
    console.log(this.props)
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
                name="name"
                placeholder="Recycleable Name"
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
              />
            </Item>
            <Item rounded>
              <Input
                name="category"
                placeholder="Category"
                onChangeText={(text) => this.setState({ category: text })}
                value={this.state.category}
              />
            </Item>
            <View style={styles.qtyInputs}>
              <Item rounded style={styles.halfInput}>
                <Input
                  name="amount"
                  placeholder='1'
                  onChangeText={(text) => this.setState({ quantity: text })}
                  value={this.state.qty}
                  keyboardType='numeric'
                />
              </Item>
              <Item rounded style={styles.halfInput}>
                <Input
                  name="unit"
                  placeholder="qty"
                  onChangeText={(text) => this.setState({ unit: text })}
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
    // flex: 1,
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyInputs: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'stretch',
  },
  halfInput: {
    flex: 1,
    // width: '50%',
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddActivity)

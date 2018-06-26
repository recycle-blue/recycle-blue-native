import React from 'react'
import { StyleSheet, Text, View, Button, Image, KeyboardAvoidingView } from 'react-native'
import { Container, Content, Form, Item, Input, Picker } from 'native-base'
import { connect } from 'react-redux'
import { addActivity } from '../store'

class AddAd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.userId,
      name: this.props.name,
      category: this.props.category,
      quantity: this.props.quantity,
      unit: this.props.unit,
      type: this.props.type,
      imageUrl: this.props.imageUrl,
    }
  }
  handleSubmit = async () => {
    await this.props.addActivity(this.state)
    this.props.navigation.navigate('product')
  }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        contentContainerStyle={styles.container}
        enabled={true}
      >
        <View style={styles.topView}>
          {!this.state.imageUrl ?
            <Button title='Take Picture' onPress={() => this.props.navigation.navigate('camera')} />
            : <Image
              style={styles.image}
              source={{ uri: this.state.imgUrl }}
            />
          }
        </View>
        <Form style={styles.form} >
          <Item rounded>
            <Input
              name="name"
              placeholder="Recycleable Name"
              onChangeText={(text) => this.setState({ name: text })}
              value={this.state.name}
            />
          </Item>
          <Item rounded>
            <Picker
              name="category"
              mode="dropdown"
              selectedValue={this.state.category}
              onValueChange={(category) => this.setState({ category })}
            >
              <Picker.Item label="Category" value="default" />
              <Picker.Item label="Plastic" value="Plastic" />
              <Picker.Item label="Glass" value="Glass" />
              <Picker.Item label="Metal" value="Metal" />
              <Picker.Item label="Paper" value="Paper" />
              <Picker.Item label="Wood" value="Wood" />
              <Picker.Item label="Compost" value="Compost" />
              <Picker.Item label="Landfill" value="Landfill" />
            </Picker>
          </Item>
          <View style={styles.qtyInputs}>
            <Item rounded style={styles.splitInput}>
              <Input
                name="amount"
                placeholder='1'
                onChangeText={(text) => this.setState({ quantity: text })}
                value={this.state.qty}
                keyboardType='numeric'
              />
            </Item>
            <Item rounded style={styles.splitInput}>
              <Picker
                name="unit"
                mode="dropdown"
                selectedValue={this.state.unit}
                onValueChange={(unit) => this.setState({ unit })}
              >
                <Picker.Item label="#" value="qty" />
                <Picker.Item label="lbs" value="lbs" />
                <Picker.Item label="kg" value="kg" />
              </Picker>
            </Item>
            <Item rounded style={styles.splitInput}>
              <Picker
                name="type"
                mode="dropdown"
                selectedValue={this.state.type}
                onValueChange={(type) => this.setState({ type })}
              >
                {/* <Picker.Item label="Type" value="default" /> */}
                <Picker.Item label="Activity" value="activity" />
                <Picker.Item label="Ad" value="ad" />
              </Picker>
            </Item>
          </View>
        </Form>
        <Button title='submit' onPress={this.handleSubmit} />
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    userId: store.user.id,// || 1,
    name: store.activity.name,// || "bottle",
    category: store.activity.category,// || "Plastic",
    quantity: store.activity.quantity,// || 1,
    unit: store.activity.unit,// || 'qty',
    type: store.activity.type,
    photo: store.activity.photo,// || 'https://i.ytimg.com/vi/1qT-rOXB6NI/maxresdefault.jpg',
    imageUrl: store.activity.imageUrl,// || 'https://i.ytimg.com/vi/1qT-rOXB6NI/maxresdefault.jpg',
  }
}

const mapDispatchToProps = (dispatch) => ({
  addActivity: (activity) => dispatch(addActivityThunk(activity)),
  refreshUser: (userId) => dispatch(me(userId)),
  refreshActivity: () => dispatch(refreshActivityThunk()),
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    // flex: 1,
    width: 250,
    height: 250,
    // borderWidth: 1,
    // borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingBottom: 10,
  },
  qtyInputs: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'stretch',
  },
  splitInput: {
    flex: 1,
    // width: '50%',
  },
  topView: {
    // flex: 1,
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAd)

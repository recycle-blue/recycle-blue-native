import React from 'react'
import { StyleSheet, View, Button, Image, KeyboardAvoidingView } from 'react-native'
import { Form, Item, Input, Picker } from 'native-base'
import { connect } from 'react-redux'
import { addAd } from '../store'

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
      address: this.props.address,
      city: this.props.city,
      state: this.props.state,
      zipCode: this.props.zipCode, 
      email: this.props.email,
      phone: this.props.phone,
    }
  }
  handleSubmit = async () => {
    await this.props.addAd(this.state)
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
              name="address"
              placeholder="Address"
              onChangeText={(address) => this.setState({ address })}
              value={this.state.address}
            />
          </Item>
          <Item rounded>
            <Input
                name="address"
                placeholder="Address"
                onChangeText={(address) => this.setState({ address })}
                value={this.state.address}
              />
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
    userId: store.user.id,
    name: store.activity.name,
    category: store.activity.category,
    quantity: store.activity.quantity,
    unit: store.activity.unit,
    type: store.activity.type,
    photo: store.activity.photo,
    imageUrl: store.activity.imageUrl,
    address: store.ad.address,
    city: store.ad.city,
    state: store.ad.state,
    zipCode: store.ad.zipCode, 
    email: store.ad.email,
    phone: store.ad.phone,
  }
}

const mapDispatchToProps = (dispatch) => ({
  addAd: (ad) => dispatch(addAdThunk(ad)),
  refreshUser: (userId) => dispatch(me(userId)),
  refreshAd: () => dispatch(refreshAdThunk()),
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

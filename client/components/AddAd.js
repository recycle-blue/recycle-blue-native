import React from 'react'
import { StyleSheet, View, Button, Platform, KeyboardAvoidingView } from 'react-native'
import { Form, Item, Input, Textarea } from 'native-base'
import { connect } from 'react-redux'
import { addAdThunk } from '../store'
import { ActivityCard } from '.'

class AddAd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activityId: this.props.activityId,
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
    this.props.navigation.navigate('activity')
  }
  render() {
    const activity = {
      ...this.props.activity,
      category: this.props.category,
      product: this.props.product
    }
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={Platform.OS === 'ios' ? -110 : -85}
        contentContainerStyle={styles.container}
        enabled={true}
      >
        <ActivityCard activity={activity} disabled={true} />
        <Form style={styles.form} >
          <Item rounded>
            <Input
              name="address"
              placeholder="Address"
              onChangeText={(address) => this.setState({ address })}
              value={this.state.address}
            />
          </Item>
          <View style={styles.splitRow}>
            <Item rounded style={styles.city}>
              <Input
                name="city"
                placeholder="City"
                onChangeText={(city) => this.setState({ city })}
                value={this.state.city}
              />
            </Item>
            <Item rounded style={styles.state}>
              <Input
                name="state"
                placeholder="State"
                onChangeText={(state) => this.setState({ state })}
                value={this.state.state}
              />
            </Item>
            <Item rounded style={styles.zipCode}>
              <Input
                name="zipCode"
                placeholder="Zip Code"
                onChangeText={(zipCode) => this.setState({ zipCode })}
                value={this.state.zipCode}
                keyboardType='numeric'
              />
            </Item>
          </View>
          <Item rounded>
            <Input
              name="email"
              placeholder="Email"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
            />
          </Item>
          {/* <Item rounded>
            <Input
              name="phone"
              placeholder="Phone Number"
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
              keyboardType='numeric'
            />
          </Item> */}
          <Item rounded>
            <Textarea
              style={{ width: '100%', paddingTop: 8, paddingBottom: 8 }}
              name="description"
              placeholder="Description"
              rowSpan={4}
              onChangeText={(description) => this.setState({ description })}
              value={this.state.description}
            />
          </Item>
        </Form>
        <Button title='submit' onPress={this.handleSubmit} />
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    activity: store.activity,
    product: store.product,
    category: store.category,
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
    width: '100%',
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
    width: '100%',
  },
  splitRow: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'stretch',
  },
  city: {
    flex: 3,
  },
  state: {
    flex: 1,
  },
  zipCode: {
    flex: 2,
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

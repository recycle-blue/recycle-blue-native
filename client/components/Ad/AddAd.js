import React from 'react'
import { StyleSheet, View, Button, Platform, KeyboardAvoidingView, Dimensions, TouchableHighlight, Text } from 'react-native'
import { Form, Item, Input, Textarea, Container } from 'native-base'
import { connect } from 'react-redux'
import { addAdThunk } from '../../store'
import { ActivityCard } from '../'
import { colors } from '../color-palette'

class AddAd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activityId: this.props.activity.id,
      address: this.props.address,
      city: this.props.city,
      state: this.props.state,
      zipCode: this.props.zipCode,
    }
  }
  handleSubmit = async () => {
    await this.props.addAd(this.state, this.props.email)
    this.props.navigation.navigate('Activity')
  }
  // static navigationOptions = {
  //   drawerLabel: () => null
  // }
  render() {
    const activity = {
      ...this.props.activity,
      category: this.props.category,
      product: this.props.product
    }
    return (
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === 'ios' ? -300 : -210}
        contentContainerStyle={styles.container}
        enabled={true}
      >
        <ActivityCard activity={activity} disabled={true} />
        <Form style={styles.form} >
          <Item rounded style={styles.items}>
            <Input
              name="address"
              placeholder="Address"
              onChangeText={(address) => this.setState({ address })}
              value={this.state.address}
            />
          </Item>
          <View style={styles.splitRow}>
            <Item rounded style={[styles.city, styles.items]}>
              <Input
                name="city"
                placeholder="City"
                onChangeText={(city) => this.setState({ city })}
                value={this.state.city}
              />
            </Item>
            <Item rounded style={[styles.state, styles.items]}>
              <Input
                name="state"
                placeholder="State"
                onChangeText={(state) => this.setState({ state })}
                value={this.state.state}
              />
            </Item>
            <Item rounded style={[styles.zipCode, styles.items]}>
              <Input
                name="zipCode"
                placeholder="Zip Code"
                onChangeText={(zipCode) => this.setState({ zipCode })}
                value={this.state.zipCode}
                keyboardType='numeric'
              />
            </Item>
          </View>
          <Item rounded style={styles.items} >
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
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor={colors.light}
        >
          <Text style={styles.buttonFont}>Submit</Text>
        </TouchableHighlight>
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
    email: store.user.email
  }
}

const mapDispatchToProps = (dispatch) => ({
  addAd: (ad) => dispatch(addAdThunk(ad)),
  refreshUser: (userId) => dispatch(me(userId)),
  refreshAd: () => dispatch(refreshAdThunk()),
})

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: '100%',
    backgroundColor: colors.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  items: {
    backgroundColor: colors.white,
    marginBottom: 5,
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    margin: 10,
  },
  button: {
    marginTop: 5,
    paddingVertical: 7,
    paddingHorizontal: 25,
    backgroundColor: colors.midLight,
    borderRadius: 100,
    borderColor: colors.midLight,
    borderWidth: 1,
    alignSelf: 'center',
  },
  buttonFont: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAd)

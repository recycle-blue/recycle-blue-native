import React from 'react'
import {
  StyleSheet,
  View,
  Button,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableHighlight,
  Text
} from 'react-native'
import { Form, Item, Input, Picker } from 'native-base'
import { connect } from 'react-redux'
import { addActivityThunk, setActivityWeekThunk } from '../../store'
import { colors } from '../color-palette'

class AddActivity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.userId,
      name: this.props.name,
      category: this.props.category,
      quantity: this.props.quantity || '1',
      unit: this.props.unit || 'qty',
      type: this.props.type || 'activity',
      imageUrl: this.props.imageUrl,
    }
  }
  handleSubmit = async () => {
    await this.props.addActivity(this.state)
    if (this.state.type === 'ad') {
      this.props.navigation.navigate('AddAd')
    } else {
      this.props.navigation.navigate('Activity')
    }
  }
  // static navigationOptions = {
  //   drawerLabel: () => null,
  // }
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior="position"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
        contentContainerStyle={styles.container}
        enabled={true}
      >
        <View style={styles.topView}>
          {this.state.imageUrl === 'default' ? (
            <Button
              title="Take Picture"
              onPress={() => this.props.navigation.navigate('Post Activity')}
            />
          ) : (
              <Image style={styles.image} source={{ uri: this.state.imageUrl }} />
            )}
        </View>
        <Form style={styles.form}>
          <Item rounded style={styles.items}>
            <Input
              name="name"
              placeholder="Recycleable Name"
              onChangeText={text => this.setState({ name: text })}
              value={this.state.name}
            />
          </Item>
          <Item rounded style={styles.items}>
            <Picker
              name="category"
              style={Platform.OS === 'ios' ? styles.ios : styles.android}
              mode="dropdown"
              selectedValue={this.state.category}
              onValueChange={category => this.setState({ category })}
            >
              <Picker.Item label="Category" value="Other" />
              <Picker.Item label="Plastic" value="Plastic" />
              <Picker.Item label="Glass" value="Glass" />
              <Picker.Item label="Metal" value="Metal" />
              <Picker.Item label="Paper" value="Paper" />
              <Picker.Item label="Wood" value="Wood" />
              <Picker.Item label="Compost" value="Compost" />
              <Picker.Item label="Landfill" value="Landfill" />
              <Picker.Item label="Category" value="Other" />
            </Picker>
          </Item>
          <View style={styles.qtyInputs}>
            <Item rounded style={[styles.splitInput, styles.items]}>
              <Input
                name="amount"
                placeholder="1"
                onChangeText={text => this.setState({ quantity: text })}
                value={this.state.qty}
                keyboardType="numeric"
              />
            </Item>
            <Item rounded style={[styles.splitInput, styles.items]}>
              <Picker
                name="unit"
                style={Platform.OS === 'ios' ? styles.ios : styles.android}
                mode="dropdown"
                selectedValue={this.state.unit}
                onValueChange={unit => this.setState({ unit })}
              >
                <Picker.Item label="#" value="qty" />
                <Picker.Item label="lbs" value="lbs" />
                <Picker.Item label="kg" value="kg" />
              </Picker>
            </Item>
            <Item rounded style={[styles.splitInput, styles.items]}>
              <Picker
                name="type"
                style={Platform.OS === 'ios' ? styles.ios : styles.android}
                mode="dropdown"
                selectedValue={this.state.type}
                onValueChange={type => this.setState({ type })}
              >
                <Picker.Item label="Activity" value="activity" />
                <Picker.Item label="Ad" value="ad" />
              </Picker>
            </Item>
          </View>
        </Form>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor={colors.light}
        >
          <Text style={styles.buttonFont}>{this.state.type === 'ad' ? 'Add Contact Info' : 'Submit'}</Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = store => {
  return {
    userId: store.user.id, // || 1,
    name: store.product.name, // || "bottle",
    category: store.category.name, // || "Plastic",
    quantity: store.activity.quantity, // || 1,
    unit: store.activity.unit, // || 'qty',
    type: store.activity.type,
    photo: store.activity.photo, // || 'https://i.ytimg.com/vi/1qT-rOXB6NI/maxresdefault.jpg',
    imageUrl: store.activity.imageUrl, // || 'https://i.ytimg.com/vi/1qT-rOXB6NI/maxresdefault.jpg',
  }
}

const mapDispatchToProps = dispatch => ({
  addActivity: activity => dispatch(addActivityThunk(activity)),
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    justifyContent: 'flex-start',
  },
  image: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    paddingBottom: 10,
  },
  qtyInputs: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  splitInput: {
    flex: 1,
  },
  items: {
    backgroundColor: colors.white,
    marginBottom: 5,
  },
  ios: {
    height: 50,
    width: 1000,
  },
  android: {},
  topView: {
    width: 250,
    height: 250,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddActivity)

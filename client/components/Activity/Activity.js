import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import {
  getProductThunk,
  getCommentsThunk,
  getCategoryThunk,
} from '../../store'
import { AddComment, AdView, CommentCard } from '../'
import { colors } from '../color-palette'
import { Icon } from 'native-base'

class Activity extends React.Component {
  componentWillMount() {
    this.props.getProduct(this.props.productId)
    this.props.getCategory(this.props.categoryId)
    this.props.getComments(this.props.activityId)
  }

  handleSubmit = async () => {
    await Linking.openURL(
      `mailto:${this.props.email}?subject= I would like to claim: ${
      this.props.name
      }`
    )
  }
  static navigationOptions = {
    drawerLabel: () => null,
  }

  render() {

    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 85}
      >
        <View style={{ backgroundColor: colors.light }}>
          <ScrollView>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 25, padding: 8 }}>
                {this.props.name}
              </Text>
              <Image style={styles.image} source={{ uri: this.props.photo }} />
              <Text style={{ paddingTop: 5 }}>Points: {this.props.points}</Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                Did You Know?
              </Text>
              <Text style={{ marginLeft: 5, marginRight: 5 }}>
                {this.props.category.description}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
                How Can You Reuse This Item?
              </Text>
              <Text style={{ marginRight: 5, marginLeft: 5, marginBottom: 10 }}>
                {this.props.recycleUse}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('Map')
                  }}
                  style={{ paddingVertical: 5, paddingHorizontal: 10, backgroundColor: colors.midLight, borderRadius: 100 }}
                >
                  <Text
                    style={{ fontWeight: 'bold', color: colors.white }}
                  >
                    Find Recycling Near You
                </Text>
                </TouchableOpacity>
                {this.props.type === 'ad' && (
                  <TouchableOpacity
                    onPress={() => {
                      this.handleSubmit()
                    }}
                    style={{ paddingVertical: 5, paddingHorizontal: 10, marginLeft: 10, backgroundColor: colors.midLight, borderRadius: 100 }}
                  >
                    <Text
                      style={{ fontWeight: 'bold', color: colors.white }}
                    >
                      Email
                </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {this.props.type === 'ad' && <AdView />}
            {this.props.comments.length ? (
              this.props.comments.map(singlecomment => (
                <CommentCard key={singlecomment.id} comment={singlecomment} />
              ))
            ) : (
                <Text>There are no comments</Text>
              )}
            <AddComment navigation={this.props.navigation} />
          </ScrollView>
        </View>
        <TouchableOpacity
          style={{ position: 'absolute', top: 8, left: 10 }}
          onPress={() => { this.props.navigation.navigate('Dashboard') }}
        >
          <Icon name='arrow-back' style={{ fontSize: 32 }} />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const mapStateToProps = state => {
  return {
    name: `${state.category.name} ${state.product.name}`,
    points: state.activity.points,
    description: state.product.description,
    recycleUse: state.product.recycleUse,
    photo: state.activity.imageUrl || state.activity.photo,
    productId: state.activity.productId,
    activityId: state.activity.id,
    categoryId: state.activity.categoryId,
    comments: state.comments,
    type: state.activity.type,
    email: state.ad.email,
    category: state.category,
  }
}

const mapDispatchToProps = dispacth => {
  return {
    getProduct: productId => dispacth(getProductThunk(productId)),
    getCategory: categoryId => dispacth(getCategoryThunk(categoryId)),
    getComments: activityId => dispacth(getCommentsThunk(activityId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity)

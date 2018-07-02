import React from 'react'
import { StyleSheet, Text, View, Image, Button, ScrollView, KeyboardAvoidingView, Platform, Linking } from 'react-native'
import { connect } from 'react-redux'
import { getProductThunk, getCommentsThunk, getCategoryThunk } from '../../store'
import { AddComment, AdView, CommentCard } from '../'
import { colors } from '../color-palette'

class Activity extends React.Component {
  componentWillMount() {
    this.props.getProduct(this.props.productId)
    this.props.getCategory(this.props.categoryId)
    this.props.getComments(this.props.activityId)
  }

  handleSubmit = async () => {
    await Linking.openURL(`mailto:${this.props.email}?subject= I would like to claim: ${this.props.name}`)
  }
  // static navigationOptions = {
  //   drawerLabel: () => null
  // }

  render() {
    return (
      <KeyboardAvoidingView
        enabled={true}
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 85}
      >
        <View>
          <ScrollView>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 25, padding: 8 }}>{this.props.name}</Text>
              <Image
                style={styles.image}
                source={{ uri: this.props.photo }}
              />
              <Text>{this.props.points}</Text>
              <Text>{this.props.description}</Text>
              <Text>{this.props.recycleUse}</Text>
              <Button
                onPress={() => {
                  this.props.navigation.navigate('Map')
                }}
                title='Find Recycling Near You'
                color={colors.main}
              />
              {this.props.type === 'ad' &&
                <Button
                  onPress={() => {
                    this.handleSubmit()
                  }}
                  title='Email'
                  color={colors.main}
                />}
            </View>
            {this.props.type === 'ad' && <AdView />}
            {
              this.props.comments.length ?
                this.props.comments.map((singlecomment) => <CommentCard key={singlecomment.id} comment={singlecomment} />) :
                <Text>There are no comments</Text>
            }
            <AddComment navigation={this.props.navigation} />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
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
})

const mapStateToProps = state => {
  return ({
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
  })
}

const mapDispatchToProps = dispacth => {
  return ({
    getProduct: (productId) => dispacth(getProductThunk(productId)),
    getCategory: (categoryId) => dispacth(getCategoryThunk(categoryId)),
    getComments: (activityId) => dispacth(getCommentsThunk(activityId))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Activity)

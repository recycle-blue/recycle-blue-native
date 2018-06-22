import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Container, Content } from 'native-base'
import { connect } from 'react-redux'
import { getProductThunk } from '../store/product'


class Product extends React.Component {
  constructor() {
    super()

  }

  componentWillMount() {
    console.log("getting here?", this.props.productId)
    this.props.getProduct(this.props.productId)
  }

  render() {
    console.log("this is working in products", this)
    return (
      <Container>
        <Content>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>This is where the image goes</Text>
            <Image
              style={styles.image}
              source={{ uri: this.props.photo }}
            />
            <Text>{this.props.points}</Text>
            <Text>{this.props.description}</Text>
            <Text>{this.props.recycleUse}</Text>
          </View>
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
})

const mapStateToProps = state => {
  return ({
    name: state.product.name,
    points: state.product.points,
    description: state.product.description,
    recycleUse: state.product.recycleUse,
    photo: state.activity.imageUrl || state.activity.photo,
    productId: state.activity.productId
  })
}

const mapDispatchToProps = dispacth => {
  return ({
    getProduct: (productId) => dispacth(getProductThunk(productId))
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product)
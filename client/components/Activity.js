import React from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import { Container, Content } from 'native-base'
import { connect } from 'react-redux'
import { getProductThunk } from '../store/product'

class Activity extends React.Component {
  componentWillMount() {
    this.props.getProduct(this.props.productId)
  }

  render() {
    return (
      <Container>
        <Content>
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
                this.props.navigation.navigate('map')
              }}
              title='Find Recycling Near You'
              color='#58A4B0'
            />
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
    name: `${state.category.name} ${state.product.name}`,
    points: state.activity.points,
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
)(Activity)

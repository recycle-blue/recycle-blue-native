import React from 'react'
import { connect } from 'react-redux'
import { getProductThunk } from '../store/product'


class Product extends React.Component {
  constructor() {
    super()

  }

  componentWillMount() {
    getProduct(this.props.productId)
  }

  render() {
    return (
      <Text>This is working</Text>
    )
  }
}

const mapStateToProps = state => {
  return ({
    name: state.product.name,
    points: state.product.points,
    description: state.product.description,
    recycleUse: state.product.recycleUse,
    photo: state.activity.photo,
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
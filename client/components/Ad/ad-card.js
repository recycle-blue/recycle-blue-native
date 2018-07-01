import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardItem, Left, Right, Row, Thumbnail } from 'native-base'
import { setActivity } from '../../store'

class AdCard extends React.Component {
  handlePress = async () => {
    if (!this.props.disabled) {
      await this.props.selectActivity(this.props.activity)
      this.props.navigation.navigate('Activity')
    }
  }
  render() {
    const { ad } = this.props
    return (
      <Card style={styles.card}>
        <CardItem button style={styles.cardItem} onPress={this.handlePress} >
          <View style={styles.left}>
            <Thumbnail medium square source={{ uri: ad.activity.imageUrl }} />
          </View>
          <View style={styles.info}>
            <Text style={styles.name} >{ad.activity.category.name + ' ' + ad.activity.product.name}</Text>
            <Text style={styles.quantity} >Qty: {ad.activity.quantity}</Text>
            <Text style={styles.quantity}>{ad.description}</Text>
          </View>
          <TouchableOpacity style={styles.right} onPress={() => { }}>
            <Text>ToMap</Text>
            <Thumbnail small source={{ uri: ad.activity.imageUrl }} />
            <Text style={{ fontWeight: 'bold', paddingTop: 5 }} >{Math.round(ad.distance * 100) / 100}</Text>
            <Text style={{ fontWeight: 'bold' }} >mi</Text>
          </TouchableOpacity>
        </CardItem>
      </Card >
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectActivity: (activity) => dispatch(setActivity(activity)),
})

const styles = StyleSheet.create({
  card: {
    maxHeight: 200,
  },
  cardItem: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  left: {
  },
  right: {
    alignItems: 'center',
  },
  info: {
    flex: 1,
    paddingHorizontal: 5,
  },
  image: {
    flex: 0.5,
    width: 300,
    height: 100,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
    width: '100%',
    textAlign: 'center',
    paddingBottom: 5,
  },
  quantity: {
    width: '100%',
    textAlign: 'center',
  },
})

export default connect(null, mapDispatchToProps)(AdCard)

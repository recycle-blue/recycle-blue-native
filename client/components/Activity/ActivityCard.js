import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { Card, CardItem, Thumbnail } from 'native-base'
import { setActivity } from '../../store'
import { SocialMedia } from '../'
import { colors } from '../color-palette'

class ActivityCard extends React.Component {
  constructor(props) {
    super(props)
  }
  handlePress = async () => {
    if (!this.props.disabled) {
      await this.props.selectActivity(this.props.activity)
      this.props.navigation.navigate('Activity')
    }
  }
  render() {
    const { activity } = this.props
    return (
      <Card style={styles.card}>
        <CardItem button style={styles.cardItem} onPress={this.handlePress} >
          <Thumbnail medium square
            source={{ uri: activity.imageUrl }}
          />
          <Text style={styles.name} >{activity.category.name + ' ' + activity.product.name}</Text>
          <Text style={styles.points} >{activity.points}</Text>
          <SocialMedia activity={activity} />
          {activity.type === 'ad' &&
            <View style={styles.marketplaceTag}>
              <Text style={styles.marketplaceTagText}>Marketplace Item</Text>
            </View>
          }
        </CardItem>
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  selectActivity: (activity) => dispatch(setActivity(activity))
})

const styles = StyleSheet.create({
  card: {
    maxHeight: 80,
    // flex: 0.1,
  },
  cardItem: {
    // flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  image: {
    flex: 0.5,
    width: 300,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    flex: 4,
    width: '100%',
    textAlign: 'center',
  },
  points: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
  },
  marketplaceTag: {
    position: 'absolute',
    width: 150,
    height: 15,
    top: 0,
    left: Dimensions.get('screen').width / 2 - 75,
    backgroundColor: colors.midDark,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  marketplaceTagText: {
    textAlign: 'center',
    fontSize: 10,
    color: colors.white,
  }
})

export default connect(null, mapDispatchToProps)(ActivityCard)

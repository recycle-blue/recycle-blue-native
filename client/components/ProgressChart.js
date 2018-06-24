import React from 'react'
import { connect } from 'react-redux'
import { ProgressCircle } from 'react-native-svg-charts'
import { Text, View } from 'react-native'
import SVG from 'expo'
const {
  Path,

} = SVG

const mapStateToProps = (state) => {
  return ({
    totalPoints: state.user.totalPoints
  })
}

class ProgressChart extends React.Component {
  render() {
    const totalPoints = this.props.totalPoints / 1000
    const nextMileStone = 1000 - this.props.totalPoints
    return (
      <View>
        <ProgressCircle
          style={{ height: 200 }}
          progress={totalPoints}
          progressColor={'rgb(134, 65, 244)'}
          startAngle={- Math.PI * 0.8}
          endAngle={Math.PI * 0.8}
        >
        </ProgressCircle >
        <Text>You have {nextMileStone} point until your next milestone</Text>
      </View>
    )
  }

}


export default connect(mapStateToProps)(ProgressChart);

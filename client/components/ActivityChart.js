import React from 'react'
import { connect } from 'react-redux'
// import { Grid, XAxis, YAxis, AreaChart, BarChart } from 'react-native-svg-charts'
import { View, StyleSheet, Dimensions } from 'react-native'
import { setActivityWeekThunk } from '../store/activity'
// import {
//   LineChart,
//   BarChart,
//   PieChart,
//   ProgressChart,
//   ContributionGraph
// } from 'react-native-chart-kit'


class ActivityChart extends React.Component {
  componentWillMount() {
    this.props.setActivityWeekThunk(this.props.user.id)
  }
  render() {
    const data = [{
      points: 1,
      day: 'mon'
    }, {
      points: 2,
      day: 'tues'
    }, {
      points: 3,
      day: 'wed'
    }, {
      points: 4,
      day: 'thurs'
    }, {
      points: 5,
      day: 'fri'
    }, {
      points: 6,
      day: 'sat'
    }, {
      points: 7,
      day: 'sun'
    }]
    return (
  //     <View>
  //       <Text>
  //         Bezier Line Chart
  // </Text>
  //       <LineChart
  //         data={{
  //           labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  //           datasets: [{
  //             data: [
  //               Math.random() * 100,
  //               Math.random() * 100,
  //               Math.random() * 100,
  //               Math.random() * 100,
  //               Math.random() * 100,
  //               Math.random() * 100
  //             ]
  //           }]
  //         }}
  //         width={Dimensions.get('window').width} // from react-native
  //         height={220}
  //         chartConfig={{
  //           backgroundColor: '#e26a00',
  //           backgroundGradientFrom: '#fb8c00',
  //           backgroundGradientTo: '#ffa726',
  //           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //           style: {
  //             borderRadius: 16
  //           }
  //         }}
  //         bezier
  //         style={{
  //           marginVertical: 8,
  //           borderRadius: 16
  //         }}
  //       />
  //     </View>

    )
  }

}

const mapStateToProps = (state) => {
  return ({
    user: state.user,
    activities: state.activity.rows,
    count: state.activity.count
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    setActivityWeekThunk: (userId) => dispatch(setActivityWeekThunk(userId))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityChart)
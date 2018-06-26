import React from 'react'
import { connect } from 'react-redux'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { View, StyleSheet } from 'react-native'
import { setActivityWeekThunk } from '../store/activity'

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
    // const xdata = ['mon', 'tues', 'wed', 'thurs', 'fri']

    // const axesSvg = { fontSize: 10, fill: 'grey' };
    // const verticalContentInset = { top: 10, bottom: 10 }
    // const xAxisHeight = 30


    return (
      <View style={{ height: 200, padding: 20 }}>

        <LineChart
          style={{ height: 200 }}
          yAccessor={item => item.item.points}
          data={data}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
        </LineChart>
        <XAxis
          style={{ marginHorizontal: -10 }}
          xAccessor={axis => axis.item.day}
          data={data}
          formatLabel={(value, index) => index}
          contentInset={{ left: 10, right: 10 }}
          svg={{ fontSize: 10, fill: 'black' }}
        />

      </View>

      // <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
      //   <YAxis
      //     data={data}
      //     style={{ marginBottom: xAxisHeight }}
      //     contentInset={verticalContentInset}
      //     svg={axesSvg}
      //   />
      //   <View style={{ flex: 1, marginLeft: 10 }}>
      //     <LineChart
      //       style={{ flex: 1 }}
      //       data={data}
      //       contentInset={verticalContentInset}
      //       svg={{ stroke: 'rgb(134, 65, 244)' }}
      //     >
      //       <Grid />
      //     </LineChart>
      //     <XAxis
      //       style={{ marginHorizontal: -10, height: xAxisHeight }}
      //       data={data}
      //       formatLabel={(value, index) => index}
      //       contentInset={{ left: 10, right: 10 }}
      //       svg={axesSvg}
      //     />
      //   </View>
      // </View>
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
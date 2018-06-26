import React from 'react'
import { connect } from 'react-redux'
import { Grid, LineChart, XAxis, YAxis, AreaChart, BarChart } from 'react-native-svg-charts'
import { View, StyleSheet } from 'react-native'
import { setActivityWeekThunk } from '../store/activity'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'

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
    // // const xAxesSvg = {
    // //   fill: 'black',
    // //   fontSize: 8,
    // //   fontWeight: 'bold',
    // //   rotation: 20,
    // //   originY: 30,
    // //   y: 5,
    // // }
    // const verticalContentInset = { top: 10, bottom: 10 }
    // // // const horizontalContentInset = { left: 10, right: 10 }
    // const xAxisHeight = 30


    return (
      <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
        <YAxis
          data={data}
          yAccessor={({ index }) => index}
          scale={scale.scaleBand}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          formatLabel={(_, index) => data[index].day}
        />
        <BarChart
          style={{ flex: 1, marginLeft: 8 }}
          data={data}
          horizontal={true}
          yAccessor={({ item }) => item.points}
          svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
          contentInset={{ top: 10, bottom: 10 }}
          spacing={0.2}
          gridMin={0}
        >
          <Grid direction={Grid.Direction.VERTICAL} />
        </BarChart>
      </View>








      // <View style={{ height: 200, padding: 20 }}>
      //   {/* <AreaChart
      //     style={{ flex: 1 }}
      //     data={data}
      //     yAccessor={({ item }) => item.points}
      //     xAccessor={({ item }) => item.day}
      //     xScale={scale.scaleTime}
      //     contentInset={{ top: 10, bottom: 10 }}
      //     svg={{ fill: 'rgba(134, 65, 244, 0.5)' }}
      //     curve={shape.curveLinear}
      //   >
      //     <Grid /> */}
      //   {/* </AreaChart> */}
      //   <XAxis
      //     data={data}
      //     svg={{
      //       fill: 'black',
      //       fontSize: 8,
      //       fontWeight: 'bold',
      //       rotation: 20,
      //       originY: 30,
      //       y: 5,
      //     }}
      //     xAccessor={({ item }) => item.day}
      //     scale={scale.scaleTime}
      //     numberOfTicks={7}
      //     style={{ marginHorizontal: -15, height: 20 }}
      //     contentInset={{ left: 10, right: 25 }}
      //     formatLabel={(value) => value}
      //   />
      // </View>











      // <View style={{ height: 200, padding: 20, flexDirection: 'row' }}>
      //   <YAxis
      //     data={data}
      //     yAccessor={item => item.item.points}
      //     style={{ marginBottom: xAxisHeight }}
      //     contentInset={verticalContentInset}
      //     svg={yAxesSvg}
      //   />
      //   <View style={{ flex: 1, marginLeft: 10 }}>
      //     <LineChart
      //       style={{ flex: 1 }}
      //       xScale={d3Scale.scaleLinear}
      //       xAccessor={item => item.item.day}
      //       yAccessor={item => item.item.points}
      //       data={data}
      //       contentInset={verticalContentInset}
      //       svg={{ stroke: 'rgb(134, 65, 244)' }}
      //     >
      //       <Grid />
      //     </LineChart>
      //     <XAxis
      //       data={data}
      //       style={{ marginHorizontal: -10, height: xAxisHeight }}
      //       xAccessor={item => item.item.day}
      //       formatLabel={(value, index) => value}

      //       contentInset={horizontalContentInset}
      //       svg={xAxesSvg}
      //     />
      //   </View>
      // </View >




      // <View style={{ height: 200, padding: 20 }}>

      //   <LineChart
      //     style={{ height: 200 }}
      //     yAccessor={item => item.item.points}
      //     data={data}
      //     svg={{ stroke: 'rgb(134, 65, 244)' }}
      //     contentInset={{ top: 20, bottom: 20 }}
      //   >
      //     <Grid />
      //   </LineChart>
      //   <XAxis
      //     style={{ marginHorizontal: -10 }}
      //     xAccessor={axis => axis.item.day}
      //     data={data}
      //     formatLabel={(value, index) => value}
      //     contentInset={{ left: 20, right: 20 }}
      //     svg={{ fontSize: 10, fill: 'black' }}
      //   />

      // </View>

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
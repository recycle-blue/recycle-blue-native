import React from 'react'
import { connect } from 'react-redux'
// import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
// import * as scale from 'd3-scale'
import { View, StyleSheet, Dimensions } from 'react-native'
import { setActivityWeekThunk } from '../store/activity'
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";


class ActivityChart extends React.Component {
  componentWillMount() {
    this.props.setActivityWeekThunk(this.props.user.id)
  }
  render() {
    const data = [
      { quarter: 1, earnings: 13000 },
      { quarter: 2, earnings: 16500 },
      { quarter: 3, earnings: 14250 },
      { quarter: 4, earnings: 19000 }
    ];
    const { width } = Dimensions.get('window')

    // const data = [
    //   {
    //     value: 50,
    //     label: 'One',
    //   },
    //   {
    //     value: 10,
    //     label: 'Two',
    //   },
    //   {
    //     value: 40,
    //     label: 'Three',
    //   },
    //   {
    //     value: 95,
    //     label: 'Four',
    //   },
    //   {
    //     value: 85,
    //     label: 'Five',
    //   },
    // ]
    // const data = [{
    //   points: 1,
    //   day: 'mon'
    // }, {
    //   points: 2,
    //   day: 'tues'
    // }, {
    //   points: 3,
    //   day: 'wed'
    // }, {
    //   points: 4,
    //   day: 'thurs'
    // }, {
    //   points: 5,
    //   day: 'fri'
    // }, {
    //   points: 6,
    //   day: 'sat'
    // }, {
    //   points: 7,
    //   day: 'sun'
    // }]
    return (
      <View >
        <VictoryChart width={width} theme={VictoryTheme.material}>
          <VictoryBar data={data} x="quarter" y="earnings" />
        </VictoryChart>
      </View>

    )
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});
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
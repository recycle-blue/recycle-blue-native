import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { connect } from 'react-redux'
import { setActivityWeekThunk } from '../../store/activity'
import { VictoryChart, VictoryArea, VictoryTheme, VictoryLabel } from "victory-native";
import { colors } from '../color-palette'

const data = [
  { day: "Mon", points: 2 },
  { day: "Tues", points: 4 },
  { day: "Wed", points: 6 },
  { day: "Thurs", points: 0 },
  { day: "Fri", points: 1 },
  { day: "Sat", points: 4 },
  { day: "Sun", points: 9 }
];

class ActivityChart extends React.Component {
  render() {
    const { height, width } = Dimensions.get('screen');
    const halfheight = height / 2
    return (
      <View style={styles.container} pointerEvents='none'>
        <VictoryChart
          width={width}
          theme={VictoryTheme.material}
          animate={{
            duration: 1000,
            onLoad: { duration: 700 }
          }}>
          <VictoryArea
            data={data}
            x="day"
            y="points"
            style={{
              data: { fill: `${colors.main}` }
            }} />
          <VictoryLabel
            text='Weekly Activity'
            textAnchor='middle'
            dx={width / 2}
            dy={halfheight / 8}
            style={{
              fill: `${colors.dark}`,
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: 'sans-serif'
            }}
          />
        </VictoryChart>
      </View >
    );
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

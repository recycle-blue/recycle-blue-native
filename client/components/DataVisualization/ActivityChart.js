import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { connect } from 'react-redux'
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { setActivityWeekThunk } from '../../store/activity'
import { VictoryChart, VictoryArea, VictoryTheme } from "victory-native";
import Svg, { Text } from 'react-native-svg';

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
      <View style={styles.container}>
        <Svg height={halfheight} width={width}>
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
                data: { fill: "#005b96" }
              }} />
          </VictoryChart>
          <Text
            fill="#011f4b"
            fontSize="20"
            fontWeight="bold"
            x={`${width / 2}`}
            y={`${(halfheight / 8)}`}
            textAnchor="middle"
          >Weekly Activity</Text>
        </Svg>
      </View>
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

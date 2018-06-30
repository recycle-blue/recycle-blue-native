import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from 'react-redux'
import { VictoryChart, VictoryTheme, VictoryArea } from "victory-native";

const data = [
  { day: "Mon", recycled: 13000 },
  { day: "Tues", recycled: 16500 },
  { day: "Wed", recycled: 14250 },
  { day: "Thurs", recycled: 19000 },
  { day: "Fri", recycled: 19000 },
  { day: "Sat", recycled: 19000 },
  { day: "Sun", recycled: 19000 }
];

class ActivityChart extends React.Component {
  render() {

    return (
      <View style={styles.container}>
        <VictoryChart width={350} theme={VictoryTheme.material} animate={{
          duration: 1000,
          onLoad: { duration: 700 }
        }}>
          <VictoryArea data={data} x="day" y="recycled" />
        </VictoryChart>
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
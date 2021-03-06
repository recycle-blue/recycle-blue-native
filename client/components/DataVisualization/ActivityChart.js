import React from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import { connect } from 'react-redux'
import { setActivityWeekThunk } from '../../store/activity'
import { VictoryChart, VictoryArea, VictoryTheme, VictoryLabel } from "victory-native"
import { colors } from '../color-palette'
import { getWeeklyData } from '../sortedActivityData'


class ActivityChart extends React.Component {

  async componentDidMount() {
    await this.props.setActivityWeekThunk(this.props.currentUser)
  }
  render() {
    const { height, width } = Dimensions.get('screen')
    const halfheight = height / 2
    const data = getWeeklyData(this.props.activities || [])
    return (
      <View style={styles.container} pointerEvents='none'>
        <VictoryChart
          width={width}
          theme={VictoryTheme.material}
         /* animate={{
            duration: 1000,
            onLoad: { duration: 700 }
          }}*/>
          <VictoryArea
            data={data}
            x="day"
            y="points"
            style={{
              data: { fill: `${colors.midDark}` }
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  }
})



const mapStateToProps = (state) => {
  return ({
    user: state.user,
    activities: state.activity.activities.rows,
    count: state.activity.activities.count,
  })
}

const mapDispatchToProps = (dispatch) => {
  return ({
    setActivityWeekThunk: (userId) => dispatch(setActivityWeekThunk(userId))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityChart)

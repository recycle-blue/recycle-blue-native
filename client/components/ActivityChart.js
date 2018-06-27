import React from 'react'
import { connect } from 'react-redux'
// import { BarChart, Grid, YAxis } from 'react-native-svg-charts'
// import * as scale from 'd3-scale'
import { View, StyleSheet, Dimensions } from 'react-native'
import { setActivityWeekThunk } from '../store/activity'
import { VictoryChart, VictoryLine, VictoryZoomContainer, VictoryBrushContainer, VictoryAxis } from "victory-native";


class ActivityChart extends React.Component {
  constructor() {
    super();
    this.state = {
      zoomDomain: { x: [new Date(1990, 1, 1), new Date(2009, 1, 1)] }
    };
  }
  componentWillMount() {
    this.props.setActivityWeekThunk(this.props.user.id)
  }

  handleZoom(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    const { width, height } = Dimensions.get('screen')

    return (
      <View>
        <VictoryChart width={width} height={height} scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={[
              { a: new Date(1982, 1, 1), b: 125 },
              { a: new Date(1987, 1, 1), b: 257 },
              { a: new Date(1993, 1, 1), b: 345 },
              { a: new Date(1997, 1, 1), b: 515 },
              { a: new Date(2001, 1, 1), b: 132 },
              { a: new Date(2005, 1, 1), b: 305 },
              { a: new Date(2011, 1, 1), b: 270 },
              { a: new Date(2015, 1, 1), b: 470 }
            ]}
            x="a"
            y="b"
          />

        </VictoryChart>
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={width} height={height} scale={{ x: "time" }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension="x"
              brushDomain={this.state.zoomDomain}
              onBrushDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis
            tickFormat={(x) => new Date(x).getFullYear()}
          />
          <VictoryLine
            style={{
              data: { stroke: "tomato" }
            }}
            data={[
              { key: new Date(1982, 1, 1), b: 125 },
              { key: new Date(1987, 1, 1), b: 257 },
              { key: new Date(1993, 1, 1), b: 345 },
              { key: new Date(1997, 1, 1), b: 515 },
              { key: new Date(2001, 1, 1), b: 132 },
              { key: new Date(2005, 1, 1), b: 305 },
              { key: new Date(2011, 1, 1), b: 270 },
              { key: new Date(2015, 1, 1), b: 470 }
            ]}
            x="key"
            y="b"
          />
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
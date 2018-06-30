import React from 'react'
import { connect } from 'react-redux'
// import { ProgressCircle } from 'react-native-svg-charts'
import { VictoryPie, VictoryTheme } from 'victory-native'
import { View, Dimensions } from 'react-native'
import Svg, { Text } from 'react-native-svg';


const mapStateToProps = (state) => {
  return ({
    totalPoints: state.user.totalPoints
  })
}

class ProgressChart extends React.Component {
  render() {
    const totalPoints = this.props.totalPoints / 1000
    const nextMileStone = 1000 - this.props.totalPoints
    const { height, width } = Dimensions.get('screen');
    const halfheight = height / 2
    console.log("what is my height here?", height)

    return (
      <View>
        <Svg height={halfheight} width={width}>
          <VictoryPie
            data={[
              { x: 1, y: 10, label: ' ' },
              { x: 2, y: 90, opacity: 0.3, label: " " }
            ]}
            style={{
              data: {
                opacity: (d) => d.opacity
              },
              labels: {
                fill: "black",
                fontSize: 20,
                fontWeight: "bold"
              }
            }}

            labelRadius={1}
            colorScale={["#3880f4", "#3880f4",]}
            width={350}
            theme={VictoryTheme.material}
            innerRadius={100}
            standalone={false}
          />
          <Text
            fill="#3880f4"
            fontSize="20"
            fontWeight="bold"
            x={`${width / 2}`}
            y={`${(halfheight / .9)}`}
            textAnchor="middle"
          >Mile Stone Progress</Text>
          <Text
            fill="#3880f4"
            fontSize="20"
            fontWeight="bold"
            x={`${width / 2}`}
            y={`${(halfheight / 1.7)}`}
            textAnchor="middle"
          >10%</Text>
        </Svg>
      </View >
    )
  }

}


export default connect(mapStateToProps)(ProgressChart);

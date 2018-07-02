import React from 'react'
import { connect } from 'react-redux'
import { VictoryPie } from 'victory-native'
import { View, Dimensions, StyleSheet } from 'react-native'
import Svg, { Text } from 'react-native-svg'
import {
  s
} from '../color-palette'


const mapStateToProps = (state) => {
  return ({
    totalPoints: state.user.totalPoints,
  })
}

class ProgressChart extends React.Component {
  render() {

    const { height, width } = Dimensions.get('screen')
    const halfheight = height / 2
    return (
      <View style={styles.container}>
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
            colorScale={["#005b96", "#005b96",]}
            width={width}
            innerRadius={100}
            standalone={false}
          />
          <Text
            fill="#011f4b"
            fontSize="20"
            fontWeight="bold"
            x={`${width / 2}`}
            y={`${(halfheight / 8)}`}
            textAnchor="middle"
          >Mile Stone Progress</Text>
          <Text
            fill="#011f4b"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white
  }
})


export default connect(mapStateToProps)(ProgressChart)

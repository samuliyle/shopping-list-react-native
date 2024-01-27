import React from 'react'
import {StyleSheet, View} from 'react-native'
import {CommonPathProps, G, Line, Path, Svg} from 'react-native-svg'

export const ShoppingCartIcon = () => {
  const class1: CommonPathProps = {
    fill: 'none',
    stroke: '#ff9068',
    strokeWidth: '12',
    strokeMiterlimit: '10'
  }
  const class2: CommonPathProps = {
    ...class1,
    strokeLinecap: 'round'
  }

  return (
    <View style={styles.svgContainer}>
      <Svg viewBox="0 0 600 450">
        <G transform="translate(0.85 1.001)">
          <Path
            d="M200.4,180.9H151c-7.8,0-14.1,6.3-14.1,14.1l0,0v14.1c0,7.8,6.3,14.1,14.1,14.1h0h42.4"
            {...class1}
          />
          <Line x1="359.3" y1="181.6" x2="244.9" y2="181.6" {...class1} />
          <Path
            d="M405.2,223.3h42.4c7.8,0,14.1-6.3,14.1-14.1l0,0V195c0-7.8-6.3-14.1-14.1-14.1l0,0h-49.4"
            {...class1}
          />
          <Path
            d="M440.5,223.3l-24.5,110.5c-2.2,9.7-10.8,16.6-20.7,16.6h-192c-9.9,0-18.5-6.9-20.7-16.6l-24.5-110.5"
            {...class1}
          />
          <Line x1="296.9" y1="244" x2="296.9" y2="316.8" {...class2} />
          <Line x1="338.5" y1="244" x2="338.5" y2="316.8" {...class2} />
          <Line x1="380.1" y1="244" x2="369.7" y2="316.8" {...class2} />
          <Line x1="255.3" y1="244" x2="265.7" y2="316.8" {...class2} />
          <Line x1="213.7" y1="244" x2="224.1" y2="316.8" {...class2} />
          <Line x1="255.3" y1="98.4" x2="213.7" y2="202.4" {...class2} />
          <Line x1="338.5" y1="98.4" x2="380.1" y2="202.4" {...class2} />
        </G>
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  svgContainer: {
    width: '100%',
    resizeMode: 'center',
    height: 300
  }
})

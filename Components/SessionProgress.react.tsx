import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Svg, { SvgProps, Circle } from 'react-native-svg';
import { mainTheme as theme } from '../Theme';

interface Props {
  radius: number;
  stroke: number;
  progress: number;
  text: string;
}

function SessionProgress(
  { radius, stroke, progress, text }: Props,
  props: SvgProps
) {
  const normalizedRadius = radius - stroke * 2;
  const circumference = radius * 2 * Math.PI;

  const strokeDashoffset = circumference - (progress / 100) * circumference;
  //console.log(progress);
  return (
    <View style={styles.root}>
      <Svg width={radius * 2} height={radius * 2} {...props} style={styles.svg}>
        <Circle
          stroke="white"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeWidth={stroke}
          fill="none"
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </Svg>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.accentColor,
    borderRadius: 5,
    marginVertical: 3,
  },
  svg: {
    marginVertical: 7,
  },
  title: {
    fontSize: 21,
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    marginVertical: 3,
    color: theme.textColor,
  },
  text: {
    position: 'absolute',
    paddingTop: 65,
    zIndex: 99,
    fontSize: 50,
    fontFamily: 'poppins-light',
    color: theme.textColor,
  },
});

export default SessionProgress;

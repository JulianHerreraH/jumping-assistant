import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { mainTheme as theme } from '../Theme';

function About() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.image} />
      <Text style={styles.title}>Jumping Assistant</Text>
      <Text style={styles.text}>
        Track your jumping session and record past ones.
      </Text>
      <Text style={styles.text}>V1.0</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.mainColor,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 27,
    fontFamily: 'poppins-bold',
    marginVertical: 3,
    color: theme.textColor,
  },
  text: {
    fontSize: 16,
    fontFamily: 'poppins-regular',
    marginVertical: 3,
    textAlign: 'center',
    color: theme.textColor,
  },
  image: {
    height: 120,
    width: 120,
    marginVertical: 5,
  },
});

export default About;

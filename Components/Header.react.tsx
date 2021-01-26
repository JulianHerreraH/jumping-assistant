import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { mainTheme as theme } from '../Theme';

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>Jumping Assistant</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.accentColor,
    width: '100%',
    height: '10%',
    marginBottom: 5,
    alignItems: 'center',
    paddingTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'poppins-bold',
    color: theme.mainColor,
    textAlign: 'center',
  },
});

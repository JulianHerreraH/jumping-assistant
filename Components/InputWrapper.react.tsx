import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

function InputWrapper({ children }: Props) {
  return <View style={styles.root}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginVertical: 8,
    width: '100%',
  },
});

export default InputWrapper;

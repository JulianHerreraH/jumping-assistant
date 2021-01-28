import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Session } from '../types/types';
import { mainTheme as theme } from '../Theme';

interface Props {
  item: Session;
}

function SessionItem({ item }: Props) {
  const totalTime = new Date(item.endTime - item.startTime);

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.totalJumps} jumps</Text>
        <Text style={styles.text}>
          {new Date(item.endTime).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          })}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>
          Total time: {totalTime.getSeconds()} secs
        </Text>
      </View>
    </View>
  );
}

export default SessionItem;

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.accentColor,
    width: '100%',
    padding: 5,
    marginVertical: 5,
    borderRadius: 8,
  },
  title: {
    fontFamily: 'poppins-bold',
    color: theme.textColor,
    fontSize: 16,
  },
  text: {
    fontFamily: 'poppins-regular',
    color: theme.textColor,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Session } from '../types/types';
import { mainTheme as theme } from '../Theme';

interface Props {
  item: Session;
}

function SessionItem({ item }: Props) {
  const totalMillis = item.endTime - item.startTime;
  const hours = Math.floor(totalMillis / 1000 / 3600);
  const minutes = formatTime((totalMillis / 1000 / 60) % 60);
  const seconds = formatTime((totalMillis / 1000) % 60);

  console.log(hours, minutes, seconds);

  function getFinalTime(): string {
    if (hours == 0 && minutes == 0) {
      return `${seconds} secs.`;
    } else if (hours == 0) {
      return `${minutes}:${seconds} mins.`;
    } else {
      return `${hours}: ${minutes}: ${seconds} hours.`;
    }
  }

  function formatTime(time: number): number {
    const format = time < 10 ? `0${time}` : time.toString();
    return parseInt(format);
  }

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
        <Text style={styles.text}>Total time: {getFinalTime()}</Text>
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

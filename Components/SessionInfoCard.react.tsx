import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { Session } from '../types/types';

import { mainTheme as theme } from '../Theme';

interface Props {
  sessionData: Session;
}

function SessionInfoCard({ sessionData }: Props) {
  const formattedTime = new Date(sessionData.startTime).toLocaleTimeString(
    'es-MX'
  );
  const endTime = new Date(sessionData.endTime).toLocaleTimeString('es-MX');
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Total jumps: {sessionData.totalJumps}</Text>
      <Text style={styles.text}>Jumps per lap: {sessionData.lapAmount}</Text>
      <Text style={styles.text}>Started at: {formattedTime}</Text>
      {sessionData.status == 'complete' && (
        <Text style={styles.text}>Finished at: {endTime} </Text>
      )}
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
  title: {
    fontSize: 21,
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    marginVertical: 3,
    color: theme.textColor,
  },
  text: {
    fontSize: 17,
    fontFamily: 'poppins-regular',
    color: theme.textColor,
  },
});

export default SessionInfoCard;

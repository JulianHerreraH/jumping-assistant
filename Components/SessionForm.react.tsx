import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';

import InputWrapper from './InputWrapper.react';
import { mainTheme as theme } from '../Theme';

interface Props {
  onSubmit: (total: number, lapAmount: number) => void;
}

function SessionForm({ onSubmit }: Props) {
  const [totalLaps, setLaps] = useState(0);
  const [lapAmount, setAmount] = useState(0);

  function handleSubmit() {
    if (
      totalLaps == 0 ||
      lapAmount == 0 ||
      Number.isNaN(totalLaps) ||
      Number.isNaN(lapAmount)
    ) {
      Alert.alert('Check your data!', 'Fill in all fields.', [{ text: 'Ok' }]);
      return;
    }
    if (totalLaps < lapAmount) {
      Alert.alert(
        'Check your data!',
        'Jumps per lap must be less than total.',
        [{ text: 'Ok' }]
      );
      return;
    }
    onSubmit(totalLaps, lapAmount);
  }

  return (
    <View style={styles.root}>
      <Text style={styles.formTitle}>Set goals for session</Text>
      <InputWrapper>
        <Text style={styles.inputLabel}>Total jumps</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 500"
          keyboardType="numeric"
          placeholderTextColor={theme.accentColor}
          onChangeText={v => setLaps(parseInt(v))}
        />
      </InputWrapper>
      <InputWrapper>
        <Text style={styles.inputLabel}>Jumps per lap</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 50"
          keyboardType="numeric"
          placeholderTextColor={theme.accentColor}
          onChangeText={v => setAmount(parseInt(v))}
        />
      </InputWrapper>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Session"
          onPress={handleSubmit}
          color={theme.accentColor}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
  formTitle: {
    fontSize: 21,
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    marginVertical: 5,
    color: theme.textColor,
  },
  inputLabel: {
    fontSize: 17,
    fontFamily: 'poppins-regular',
    color: theme.textColor,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.accentColor,
    padding: 3,
    borderRadius: 8,
    fontSize: 16,
    color: theme.accentColor,
  },
  buttonContainer: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: 7,
  },
});

export default SessionForm;

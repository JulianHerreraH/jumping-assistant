import React, { useState } from 'react';
import {
  View,
  Button,
  useWindowDimensions,
  StyleSheet,
  Alert,
  Text,
  StatusBar,
} from 'react-native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

import {
  HomeScreenTabProp,
  HomeScreenRouteProps,
  Session,
} from '../types/types';

import AsyncStorage from '@react-native-async-storage/async-storage';
import SessionProgress from './SessionProgress.react';
import SessionInfoCard from './SessionInfoCard.react';
import SessionForm from './SessionForm.react';
import { mainTheme as theme } from '../Theme';

interface Props {
  route: HomeScreenRouteProps;
  navigation: HomeScreenTabProp;
}

const initialData: Session = {
  id: '',
  totalJumps: 0,
  lapAmount: 0,
  progress: 0,
  progressText: 'Start!',
  startTime: 0,
  endTime: 0,
  status: 'empty',
};

function Home({ route, navigation }: Props) {
  const [session, setSession] = useState<Session>(initialData);

  const width = useWindowDimensions().width;
  const radius = width >= 992 ? width * 0.1 : width * 0.3;

  function submitSessionData(total: number, lapAmount: number) {
    setSession(prevData => ({
      ...prevData,
      id: Date.now().toString(),
      totalJumps: total,
      lapAmount: lapAmount,
      progress: 0,
      progressText: 'Start!',
      startTime: Date.now(),
      status: 'active',
    }));
  }
  function updateProgress() {
    if (session.progress >= 99.99) {
      setSession(prevData => ({
        ...prevData,
        progressText: 'Done!',
        status: 'complete',
        endTime: Date.now(),
      }));
      return;
    }

    const laps = Math.ceil(session.totalJumps / session.lapAmount);
    const increments = 100 / laps;
    console.log(increments, laps);
    const current = Math.ceil(session.progress / increments + 1);
    let newText = `${current}/${laps}`;

    setSession(prevData => ({
      ...prevData,
      progress: prevData.progress + increments,
      progressText: newText,
    }));
  }

  function clearSession() {
    setSession(initialData);
  }
  async function saveSession() {
    try {
      const jsonValue = await AsyncStorage.getItem('sessions');
      const values: Array<Session> =
        jsonValue != null ? JSON.parse(jsonValue) : null;
      if (values != null) {
        const newArray = [...values, session];
        const jsonNewArray = JSON.stringify(newArray);
        await AsyncStorage.setItem('sessions', jsonNewArray);
      } else {
        const newArray = [session];
        const jsonNewArray = JSON.stringify(newArray);
        await AsyncStorage.setItem('sessions', jsonNewArray);
      }
    } catch (e) {
      Alert.alert('Oops!', 'Error storing session data', [{ text: 'Ok' }]);
      return;
    }
    clearSession();
    navigation.navigate('Sessions', { shouldUpdate: true });
  }

  function getActiveComponent(): JSX.Element {
    switch (session.status) {
      case 'active':
        return (
          <View>
            <View style={styles.row}>
              <Text style={styles.title}>Active session</Text>
              <SessionProgress
                radius={radius}
                stroke={4}
                progress={session.progress}
                text={session.progressText}
              />
              <Button
                title="Next"
                onPress={updateProgress}
                color={theme.accentColor}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.title}>Session data</Text>
              <SessionInfoCard sessionData={session} />
            </View>
          </View>
        );
      case 'complete':
        return (
          <View>
            <View style={styles.row}>
              <Text style={styles.title}>Do you want to save the session?</Text>
              <SessionInfoCard sessionData={session} />
            </View>
            <View style={styles.row}>
              <Button
                title="Save"
                onPress={saveSession}
                color={theme.accentColor}
              />
            </View>
            <View>
              <Button title="Delete" onPress={clearSession} color="red" />
            </View>
          </View>
        );
      case 'empty':
        return <SessionForm onSubmit={submitSessionData} />;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={theme.accentColor}
          barStyle="light-content"
        />
        {getActiveComponent()}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.mainColor,
    padding: 20,
  },
  title: {
    fontSize: 21,
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    marginVertical: 3,
    color: theme.textColor,
  },
  row: {
    width: '100%',
    marginVertical: 3,
  },
});

export default Home;

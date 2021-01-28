import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SessionsScreenTabProp,
  SessionsScreenRouteProps,
  Session,
} from '../types/types';

import SessionItem from './SessionItem.react';
import SwipeableRow from './SwipeableRow.react';
import { mainTheme as theme } from '../Theme';

interface Props {
  route: SessionsScreenRouteProps;
  navigation: SessionsScreenTabProp;
}

function Sessions({ route, navigation }: Props) {
  const [sessions, setSessions] = useState<Array<Session>>([]);
  const [shouldUpdate, setUpdate] = useState(route.params?.shouldUpdate);

  useEffect(() => {
    setUpdate(route.params?.shouldUpdate);
  }, [route]);

  useEffect(() => {
    async function fetchData() {
      const data = await getSessions();
      if (data.length > 0) setSessions([...data]);
      setUpdate(false);
    }
    if (shouldUpdate) fetchData();
  }, [shouldUpdate]);

  async function getSessions(): Promise<Array<Session>> {
    let data: Array<Session> = [];
    try {
      const jsonValue = await AsyncStorage.getItem('sessions');
      data = jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      Alert.alert('Oops', 'Error getting stored data!', [{ text: 'Ok' }]);
    }
    return data;
  }

  async function clearData() {
    try {
      await AsyncStorage.clear();
      setSessions([]);
      setUpdate(true);
    } catch (e) {
      Alert.alert('Oops', 'Error getting deleting data!', [{ text: 'Ok' }]);
    }
  }

  async function deleteItem() {
    console.log('deleted');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session history</Text>
      {sessions.length == 0 && (
        <Text style={styles.noSessionText}>No sessions recorded</Text>
      )}
      <FlatList
        style={styles.list}
        data={sessions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          //<SwipeableRow>
          <SessionItem item={item} />
          //</SwipeableRow>
        )}
      />
      <Button title="Clear all" onPress={clearData} color={theme.accentColor} />
    </View>
  );
}

export default Sessions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.mainColor,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 21,
    fontFamily: 'poppins-bold',
    textAlign: 'center',
    marginVertical: 5,
    color: theme.textColor,
  },
  list: {
    width: '100%',
  },
  noSessionText: {
    fontFamily: 'poppins-bold',
    color: theme.textColor,
    fontSize: 24,
  },
});

import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Header from './Components/Header.react';
import Home from './Components/Home.react';

import { mainTheme as theme } from './Theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
  });

  if (fontsLoaded) {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Header />
          <Home />
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return <AppLoading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.mainColor,
    alignItems: 'center',
  },
});

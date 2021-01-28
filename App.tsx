import 'react-native-gesture-handler';

import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import About from './Components/About.react';
import Home from './Components/Home.react';
import Sessions from './Components/Sessions.react';

import { ROUTES } from './routes/routes';
import { mainTheme as theme } from './Theme';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const RootTabNavigator = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'poppins-light': require('./assets/fonts/Poppins-Light.ttf'),
  });

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <RootTabNavigator.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name == 'Home') {
                iconName = focused ? 'home-sharp' : 'home-outline';
              } else if (route.name == 'Sessions') {
                iconName = 'list-sharp';
              } else {
                iconName = focused
                  ? 'information-circle-sharp'
                  : 'information-circle-outline';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: theme.mainColor,
            inactiveTintColor: theme.textColor,
            labelStyle: { fontSize: 13, fontFamily: 'poppins-regular' },
            style: { backgroundColor: theme.accentColor, borderTopWidth: 0 },
            keyboardHidesTabBar: true,
          }}
        >
          <RootTabNavigator.Screen name={ROUTES.Home} component={Home} />
          <RootTabNavigator.Screen
            name={ROUTES.SessionsMain}
            component={Sessions}
            initialParams={{ shouldUpdate: true }}
          />
          <RootTabNavigator.Screen name={ROUTES.About} component={About} />
        </RootTabNavigator.Navigator>
      </NavigationContainer>
    );
  } else {
    return <AppLoading />;
  }
}

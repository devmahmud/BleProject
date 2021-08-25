import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home';
import DeviceScreen from '../screens/Device';

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Device" component={DeviceScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigator;

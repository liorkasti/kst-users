import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import UsersScreen from '../screens/UsersScreen';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="UsersScreen" component={UsersScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {useSelector} from 'react-redux';

import UsersScreen from '../screens/UsersScreen';
import AppNavigation from './AppNavigation';

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => {
  const {username} = useSelector(state => state.user);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="UsersScreen" component={UsersScreen} />
        <RootStack.Screen
          name="AppNavigation"
          component={AppNavigation}
          options={() => ({
            headerShown: true,
            title: `${username}`,
            headerTitleAlign: 'center',
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
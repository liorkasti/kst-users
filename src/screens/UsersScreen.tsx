import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';

import UserList from '../components/UserList';

type Props = {};

const UsersScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users</Text>
      <UserList />
    </View>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60 - StatusBar?.currentHeight,
  },
  title: {
    color: 'red',
  },
});

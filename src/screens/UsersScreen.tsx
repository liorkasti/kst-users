import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import plus from '../assets/plus.png';
import BottomModal from '../components/BottomModal';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import {COLORS} from '../utils/constance';
import {User} from '../redux/types';
import {addUser} from '../redux/slices/users-slice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsersScreen = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  const onAddUser = async (newUser: User) => {
    try {
      // Update the user in the local state
      const savedUsers = await AsyncStorage.getItem('users');
      let localUsers = savedUsers ? JSON.parse(savedUsers) : [];
      localUsers.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(localUsers));
      // Add the user to the state
      dispatch(addUser(newUser));
      handleCloseModal();
    } catch (error) {
      console.log('Error saving expense:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Users</Text>
        <UserList />
      </View>
      <TouchableOpacity onPress={handleOpenModal}>
        <View style={styles.pluse}>
          <Image
            source={plus}
            style={{
              width: 36,
              height: 36,
              tintColor: 'white',
            }}
          />
        </View>
      </TouchableOpacity>
      {isAddModalOpen && (
        <BottomModal visible={isAddModalOpen} onClose={handleCloseModal}>
          <UserForm
            title={'Create Profile'}
            userData={undefined}
            onSubmit={onAddUser}
            isEditMode={false}
          />
        </BottomModal>
      )}
    </>
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
  pluse: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 55,
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

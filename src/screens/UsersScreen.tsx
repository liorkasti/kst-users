import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

import filterIcon from '../assets/filter.png';
import plusIcon from '../assets/plus.png';
import FormModal from '../components/FormModal';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';
import {COLORS} from '../utils/constance';
import {FilteredData, User} from '../redux/types';
import {addUser} from '../redux/slices/users-slice';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserFilter from '../components/UserFilter';

const UsersScreen = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const dispatch = useDispatch();

  const onAddUser = async (newUser: User) => {
    try {
      // Update the user in the local state
      const savedUsers = await AsyncStorage.getItem('users');
      let localUsers = savedUsers ? JSON.parse(savedUsers) : [];
      localUsers.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(localUsers));
      // Add the user to the state
      dispatch(addUser(newUser));
      setIsAddModalOpen(false);
    } catch (error) {
      console.log('Error saving user:', error);
    }
  };

  const onFilter = async (filteredData: FilteredData) => {
    try {
      dispatch(filterUsers(filteredData));

      setIsFilterModalOpen(false);
    } catch (error) {
      console.log('Error saving user:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Random Users</Text>
        <UserList />
      </View>
      <TouchableOpacity onPress={() => setIsFilterModalOpen(prev => !prev)}>
        <View style={[styles.icon, styles.secondIcon]}>
          <Image source={filterIcon} style={styles.modalButton} />
        </View>
      </TouchableOpacity>
      {isFilterModalOpen && (
        <FormModal
          visible={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(prev => !prev)}>
          <UserFilter title={'Filter'} onSubmit={onFilter} />
        </FormModal>
      )}
      <TouchableOpacity onPress={() => setIsAddModalOpen(prev => !prev)}>
        <View style={styles.icon}>
          <Image source={plusIcon} style={styles.modalButton} />
        </View>
      </TouchableOpacity>
      {isAddModalOpen && (
        <FormModal
          visible={isAddModalOpen}
          onClose={() => setIsAddModalOpen(prev => !prev)}>
          <UserForm
            title={'Create Profile'}
            userData={undefined}
            onSubmit={onAddUser}
            isEditMode={false}
          />
        </FormModal>
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
    marginTop: Platform.OS === 'ios' ? 60 : 24,
  },
  title: {
    color: COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalButton: {
    width: 36,
    height: 36,
    tintColor: 'white',
  },
  icon: {
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
  secondIcon: {
    marginBottom: 65,
    backgroundColor: COLORS.thirdary,
  },
});

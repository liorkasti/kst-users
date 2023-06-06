import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {editUser, fetchUsers, removeUser} from '../redux/slices/users-slice';
import {RootState} from '../redux/store'; // Assuming you have a separate store configuration file
import {User} from '../redux/types';
import FormModal from './FormModal';
import UserCard from './UserCard';
import UserForm from './UserForm';

const UserList: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const handleOpenModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const dispatch = useDispatch();
  const {
    data: users,
    filteredData,
    status,
    error,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
    updateLocalStorage();
  }, [dispatch]);

  const updateLocalStorage = async () => {
    try {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
      console.log('Error updating local storage:', error);
    }
  };

  const handleEdit = (user: User) => {
    handleOpenModal();
    setSelectedUser(user);
  };

  const handleDelete = (userId: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => dispatch(removeUser(userId)),
        },
      ],
    );
  };

  const onEditUser = async (user: User) => {
    try {
      // Update the user in the local state
      const savedUsers = await AsyncStorage.getItem('users');
      let localUsers = savedUsers ? JSON.parse(savedUsers) : [];
      localUsers.push(user);
      await AsyncStorage.setItem('users', JSON.stringify(localUsers));
      // Update the user in state
      dispatch(editUser({id: selectedUser.email, user}));
      handleCloseModal();
    } catch (error) {
      console.log('Error saving user:', error);
    }
  };

  const renderUserItem = ({item}: {item: User}) => {
    return (
      <UserCard
        user={item}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        onEditUser={onEditUser}
      />
    );
  };

  if (status === 'loading') {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (status === 'failed') {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <>
      <FlatList
        data={filteredData.length > 0 ? filteredData : users}
        numColumns={2}
        keyExtractor={(item: User) => item.email}
        renderItem={renderUserItem}
      />
      {isEditModalOpen && (
        <FormModal
          visible={isEditModalOpen}
          onClose={() => setIsEditModalOpen(!isEditModalOpen)}>
          <UserForm
            title={'Edit Profile'}
            userData={selectedUser}
            onSubmit={onEditUser}
            isEditMode={true}
          />
        </FormModal>
      )}
    </>
  );
};

export default UserList;

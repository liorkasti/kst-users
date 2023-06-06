import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import editIcon from '../assets/edit.png';
import removeIcon from '../assets/remove.png';
import {
  addUser,
  editUser,
  fetchUsers,
  removeUser,
} from '../redux/slices/users-slice';
import {RootState} from '../redux/store'; // Assuming you have a separate store configuration file
import FormModal from './FormModal';
import UserForm from './UserForm';
import {User} from '../redux/types';

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
    //TODO: open a modal with confirm and cancel button.
    dispatch(removeUser(userId));
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
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>
            {item.name.title} {item.name.first} {item.name.last}
          </Text>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Image source={editIcon} style={styles.editIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(item.email)}>
            <Image source={removeIcon} style={styles.deleteIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.email}>Email: {item.email}</Text>
        <Image source={{uri: item.picture?.medium}} style={styles.userImage} />
        <Text>
          Location: {item?.location?.street?.name}, {item?.location?.city},{' '}
          {item?.location?.country}
        </Text>
      </View>
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
        data={users}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: 'red',
    width: '80%',
  },
  userImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    marginBottom: 10,
  },
  row: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 62,
  },
  email: {marginBottom: 10},
  editIcon: {width: 12, height: 12, marginRight: 16},
  deleteIcon: {width: 14, height: 14},
});

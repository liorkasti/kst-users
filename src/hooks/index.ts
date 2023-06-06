//TODO: hooks
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useDispatch, useSelector} from 'react-redux';
// import { addUser, editUser } from '../redux/slices/users-slice';

// export const onAddUser = async (newUser: User) => {
//   try {
//     const dispatch = useDispatch();
//     // Update the user in the local state
//     const savedUsers = await AsyncStorage.getItem('users');
//     let localUsers = savedUsers ? JSON.parse(savedUsers) : [];
//     localUsers.push(newUser);
//     await AsyncStorage.setItem('users', JSON.stringify(localUsers));
//     // Add the user to the state
//     dispatch(addUser(newUser));
//   } catch (error) {
//     console.log('Error saving user:', error);
//   }
// };

// export const onEditUser = async (user: User) => {
//   try {
//     const dispatch = useDispatch();

//     // Update the user in the local state
//     const savedUsers = await AsyncStorage.getItem('users');
//     let localUsers = savedUsers ? JSON.parse(savedUsers) : [];
//     localUsers.push(user);
//     await AsyncStorage.setItem('users', JSON.stringify(localUsers));
//     // Update the user in state
//     dispatch(editUser({id: selectedUser.email, user}));
//   } catch (error) {
//     console.log('Error saving user:', error);
//   }
// };

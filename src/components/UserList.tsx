import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../redux/store'; // Assuming you have a separate store configuration file
import {fetchUsers, User} from '../redux/slices/users-slice';
import {useNavigation} from '@react-navigation/native';

const UserList: React.FC = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {
    data: users,
    status,
    error,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const renderUserItem = ({item}: {item: User}) => {
    const handleUserPress = () => {
      //   console.log('navigation', navigation);
      navigation.navigate('AppNavigation');
    };
    return (
      <TouchableOpacity onPress={handleUserPress} style={styles.container}>
        <Text style={styles.title}>
          {item.name.title} {item.name.first} {item.name.last}
        </Text>
        <Text>Email: {item.email}</Text>
        <Image source={{uri: item.picture.medium}} style={styles.userImage} />
        <Text>
          Location: {item.location.street.name}, {item.location.city},{' '}
          {item.location.country}
        </Text>
      </TouchableOpacity>
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
    <FlatList
      data={users}
      keyExtractor={(item: User) => item.email}
      renderItem={renderUserItem}
    />
  );
};

export default UserList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'red',
    marginTop: 10,
  },
  userImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
});

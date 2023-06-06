import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {User} from '../redux/types';
import editIcon from '../assets/edit.png';
import removeIcon from '../assets/remove.png';
import {COLORS} from '../utils/constance';
interface UserCardProps {
  user: User | undefined;
  handleEdit: (user: User) => void;
  handleDelete: (userId: string) => void;
  onEditUser: (user: User) => void;
}
const UserCard: React.FC<UserCardProps> = ({
  user: userData = undefined,
  handleEdit,
  handleDelete,
  onEditUser,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{uri: userData.picture.medium}} style={styles.image} />
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handleEdit(userData)}>
          <Image source={editIcon} style={styles.editIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(userData.email)}>
          <Image source={removeIcon} style={styles.deleteIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfoContainer}>
        <Text
          style={
            styles.name
          }>{`${userData.name.first} ${userData.name.last}`}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text
          style={
            styles.location
          }>{`${userData.location.city}, ${userData.location.country}`}</Text>
      </View>
    </View>
  );
};

const numColumns = 2; // Number of columns in the FlatList
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / numColumns - 24;

const styles = StyleSheet.create({
  cardContainer: {
    margin: 6,
    width: cardWidth,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    elevation: 5, // For Android shadow effect
    shadowColor: '#000000', // For iOS shadow effect
    shadowOpacity: 0.2, // For iOS shadow effect
    shadowRadius: 2, // For iOS shadow effect
    shadowOffset: {
      width: 0,
      height: 2,
    }, // For iOS shadow effect
  },
  row: {
    marginHorizontal: 10,
    marginTop: -15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editIcon: {width: 16, height: 16, marginRight: 16},
  deleteIcon: {width: 16, height: 16},
  imageContainer: {
    padding: 10,
  },
  image: {
    width: cardWidth - 20,
    height: cardWidth - 20,
    borderRadius: (cardWidth - 20) / 2,
  },
  userInfoContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.title,
  },
  email: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 500,
    color: COLORS.subtext,
  },
  location: {
    fontSize: 12,
    color: COLORS.title,
  },
});

export default UserCard;

import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useSelector} from 'react-redux';

import {RootState} from '../redux/store';
import {User, UserLocation, UserName, UserPicture} from '../redux/types';
import {COLORS} from '../utils/constance';
import {isEmailUnique} from '../utils/validations';
import SaveButton from './Button';

interface UserFormProps {
  title: string;
  userData: User | undefined;
  onSubmit: (user: User) => void;
  isEditMode: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  title,
  userData = null,
  onSubmit,
  isEditMode,
}) => {
  const [name, setName] = useState<UserName>({
    title: '',
    first: '',
    last: '',
  });
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState<UserLocation>({
    country: '',
    city: '',
    street: {
      name: '',
      number: 0,
    },
  });
  const [picture, setPicture] = useState<UserPicture>({medium: ''});

  const [imageSource, setImageSource] = useState('');
  const {data: users} = useSelector((state: RootState) => state.users);

  const handleSubmit = () => {
    console.log('picture', picture);
    // Perform validation
    if (
      !name.title ||
      !name.first ||
      !name.last ||
      !email ||
      !location.country ||
      !location.city ||
      !location.street.name
      // || !picture
    ) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    if (name.first.length < 3) {
      Alert.alert(
        'Validation Error',
        'First name should be at least 3 characters long.',
      );
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return;
    }

    if (!isEmailUnique(users, email)) {
      Alert.alert('Validation Error', 'This email already exists.');
      return;
    }

    // Create the user object
    const user: User = {
      name,
      email,
      picture,
      location,
    };
    console.log({user});
    // Call the onSubmit callback with the user object
    onSubmit(user);
  };

  const handleImagePick = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response: ImagePickerResponse) => {
        if (!response.didCancel && !response.error) {
          setImageSource(response.uri);
          setPicture(prevState => ({...prevState, medium: response.uri}));
          console.log(response);
        }
      },
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>{title}</Text>
        {/* TODO: custom TextInput */}
        <TextInput
          style={styles.input}
          placeholder={userData?.name?.title || 'Title'}
          placeholderTextColor={COLORS.placeholder}
          value={name.title}
          onChangeText={text =>
            setName(prevState => ({...prevState, title: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder={userData?.name?.first || 'First Name'}
          placeholderTextColor={COLORS.placeholder}
          value={name.first}
          onChangeText={text =>
            setName(prevState => ({...prevState, first: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder={userData?.name?.last || 'Last Name'}
          placeholderTextColor={COLORS.placeholder}
          value={name.last}
          onChangeText={text =>
            setName(prevState => ({...prevState, last: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder={userData?.email || 'Email'}
          placeholderTextColor={COLORS.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder={userData?.location?.country || 'Country'}
          placeholderTextColor={COLORS.placeholder}
          value={location.country}
          onChangeText={text =>
            setLocation(prevState => ({...prevState, country: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder={isEditMode ? userData?.location?.city : 'City'}
          placeholderTextColor={COLORS.placeholder}
          value={location.city}
          onChangeText={text =>
            setLocation(prevState => ({...prevState, city: text}))
          }
        />
        <TextInput
          style={styles.input}
          placeholder={userData?.location?.street?.name || 'Street Name'}
          placeholderTextColor={COLORS.placeholder}
          value={location.street.name}
          onChangeText={text =>
            setLocation(prevState => ({
              ...prevState,
              street: {...prevState.street, name: text},
            }))
          }
        />
        {imageSource && (
          <Image source={{uri: imageSource}} style={styles.userImage} />
        )}
        {isEditMode && (
          <Image
            source={{uri: userData?.picture?.medium}}
            style={styles.userImage}
          />
        )}
        {/* TODO: add custom button */}
        <Button title="Pick Image" onPress={handleImagePick} />
        <SaveButton onButtonPress={handleSubmit} text="Save" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  userImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#BFBFBF',
    borderRadius: 4,
    padding: 10,
    marginBottom: 50,
  },
});

export default UserForm;

import React, {useState} from 'react';
import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
import {isEmailUnique, validateEmail} from '../utils/validations';
import SaveButton from './Button';
import editIcon from '../assets/edit.png';
import uploadIcon from '../assets/upload.png';

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

  const {data: users} = useSelector((state: RootState) => state.users);

  const handleSubmit = () => {
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
      login: {uuid: email},
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
          console.log(response);
          const selectedAsset = response?.assets[0];
          setPicture(prevState => ({...prevState, medium: selectedAsset.uri}));
          console.log({picture});
        }
      },
    );
  };

  const titlePL = userData?.name?.title || 'Title';
  const firstPL = userData?.name?.first || 'First Name';
  const lastPL = userData?.name?.last || 'Last Nmae';
  const emailPL = userData?.email || 'Email';
  const countryPL = userData?.location?.country || 'Country';
  const cityPL = userData?.location?.city || 'City';
  const streetPL = userData?.location?.street || 'Street Name';
  const nameTitle = 'Name:';
  const emailTitle = 'Email:';
  const locationTitle = 'Location:';

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.sectionTitle}>{nameTitle}</Text>
        <View style={styles.sectionRow}>
          <TextInput
            style={[styles.input, styles.nameTitle]}
            placeholder={titlePL}
            placeholderTextColor={COLORS.placeholder}
            value={name.title}
            onChangeText={text =>
              setName(prevState => ({...prevState, title: text}))
            }
          />
          <TextInput
            style={[styles.input, styles.firstName]}
            placeholder={firstPL}
            placeholderTextColor={COLORS.placeholder}
            value={name.first}
            onChangeText={text =>
              setName(prevState => ({...prevState, first: text}))
            }
          />
        </View>
        <TextInput
          style={[styles.input, styles.lastName]}
          placeholder={lastPL}
          placeholderTextColor={COLORS.placeholder}
          value={name.last}
          onChangeText={text =>
            setName(prevState => ({...prevState, last: text}))
          }
        />
        <Text style={styles.sectionTitle}>{emailTitle}</Text>
        <TextInput
          style={styles.input}
          placeholder={emailPL}
          placeholderTextColor={COLORS.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.sectionTitle}>{locationTitle}</Text>
        <View style={styles.sectionRow}>
          <TextInput
            style={[styles.input, styles.country]}
            placeholder={countryPL}
            placeholderTextColor={COLORS.placeholder}
            value={location.country}
            onChangeText={text =>
              setLocation(prevState => ({...prevState, country: text}))
            }
          />
          <TextInput
            style={[styles.input, styles.city]}
            placeholder={cityPL}
            placeholderTextColor={COLORS.placeholder}
            value={location.city}
            onChangeText={text =>
              setLocation(prevState => ({...prevState, city: text}))
            }
          />
        </View>
        {/* <TextInput
          style={[styles.input, styles.street]}
          placeholder={streetPL}
          placeholderTextColor={COLORS.placeholder}
          value={location.street.name}
          onChangeText={text =>
            setLocation(prevState => ({
              ...prevState,
              street: {...prevState.street, name: text},
            }))
          }
        /> */}
        <View style={styles.imageContainer}>
          {picture.medium ? (
            <>
              <Image source={{uri: picture.medium}} style={styles.userImage} />
              <TouchableOpacity
                onPress={handleImagePick}
                style={styles.editWrapper}>
                <Image source={editIcon} style={styles.editIcon} />
              </TouchableOpacity>
            </>
          ) : isEditMode ? (
            <>
              <Image
                source={{uri: userData?.picture?.medium}}
                style={styles.userImage}
              />
              <TouchableOpacity
                onPress={handleImagePick}
                style={styles.editWrapper}>
                <Image source={editIcon} style={styles.editIcon} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={handleImagePick}
              style={styles.imagePicker}>
              <Text style={styles.pickerTitle}>Pick Image</Text>
              <Image source={uploadIcon} style={styles.uploadIcon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <SaveButton onButtonPress={handleSubmit} text="Save" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 62,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.submit,
  },
  sectionTitle: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: COLORS.submit,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
    color: COLORS.thirdary,
    fontWeight: '500',
  },
  nameTitle: {
    width: '27%',
    marginRight: '3%',
  },
  firstName: {
    width: '70%',
  },
  lastName: {},
  country: {
    width: '47%',
    marginRight: '3%',
  },
  city: {
    width: '50%',
  },
  street: {},
  imageContainer: {
    alignItems: 'center',
    paddingTop: 20,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
    marginBottom: 20,
  },
  imagePicker: {
    marginTop: 20,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  pickerTitle: {
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'left',
    color: COLORS.submit,
  },
  editWrapper: {
    alignItems: 'center',
    top: -38,
  },
  uploadIcon: {
    paddingBottom: 5,
    width: 22,
    height: 22,
  },
  editIcon: {
    width: 18,
    height: 18,
    marginLeft: 100,
  },
});

export default UserForm;

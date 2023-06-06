import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

import {RootState} from '../redux/store';
import {FilteredData, User, UserLocation, UserName} from '../redux/types';
import {COLORS} from '../utils/constance';
import SaveButton from './Button';

interface UserFilterProps {
  title: string;
  userData: FilteredData | undefined;
  onSubmit: (user: User) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({title, onSubmit}) => {
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

  const {data: users} = useSelector((state: RootState) => state.users);

  const handleSubmit = () => {
    // Create the user object to filter the users
    const filteredData: FilteredData = {
      login: {uuid: email},
      name,
      email,
    };
    console.log({filteredData});
    // Call the onSubmit callback with the user object
    onSubmit(filteredData);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>{title}</Text>
        {/* TODO: custom TextInput */}
        <Text style={styles.sectionTitle}>Name:</Text>
        <View style={styles.sectionRow}>
          <TextInput
            style={[styles.input, styles.nameTitle]}
            placeholder={'Title'}
            placeholderTextColor={COLORS.placeholder}
            value={name.title}
            onChangeText={text =>
              setName(prevState => ({...prevState, title: text}))
            }
          />
          <TextInput
            style={[styles.input, styles.firstName]}
            placeholder={'First Name'}
            placeholderTextColor={COLORS.placeholder}
            value={name.first}
            onChangeText={text =>
              setName(prevState => ({...prevState, first: text}))
            }
          />
          <TextInput
            style={[styles.input, styles.lastName]}
            placeholder={'Last Name'}
            placeholderTextColor={COLORS.placeholder}
            value={name.last}
            onChangeText={text =>
              setName(prevState => ({...prevState, last: text}))
            }
          />
        </View>
        <Text style={styles.sectionTitle}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder={'Email'}
          placeholderTextColor={COLORS.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.sectionTitle}>Location:</Text>
        <View style={styles.sectionRow}>
          <TextInput
            style={[styles.input, styles.country]}
            placeholder={'Country'}
            placeholderTextColor={COLORS.placeholder}
            value={location.country}
            onChangeText={text =>
              setLocation(prevState => ({...prevState, country: text}))
            }
          />
          <TextInput
            style={[styles.input, styles.city]}
            placeholder={'City'}
            placeholderTextColor={COLORS.placeholder}
            value={location.city}
            onChangeText={text =>
              setLocation(prevState => ({...prevState, city: text}))
            }
          />
        </View>
        <TextInput
          style={[styles.input, styles.street]}
          placeholder={'Street Name'}
          placeholderTextColor={COLORS.placeholder}
          value={location.street.name}
          onChangeText={text =>
            setLocation(prevState => ({
              ...prevState,
              street: {...prevState.street, name: text},
            }))
          }
        />
        <View style={styles.bottomContainer}>
          <SaveButton onButtonPress={handleSubmit} text="Save" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 62,
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '400',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: COLORS.filter,
    borderRadius: 4,
    padding: 10,
    marginBottom: 50,
    justifyContent: 'space-around',
  },
  nameTitle: {
    width: '10%',
  },
  firstName: {
    width: '38%',
    paddingHorizontal: '1%',
  },
  lastName: {
    width: '50%',
  },
  country: {
    width: '48%',
  },
  city: {
    width: '48%',
  },
  street: {
    width: '100%',
  },
});

export default UserFilter;

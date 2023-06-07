import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import {User, UserId, UserLocation, UserName} from '../redux/types';
import {COLORS} from '../utils/constance';
import SaveButton from './Button';

interface UserFilterProps {
  title: string;
  userData: User | undefined;
  onSubmit: (user: User) => void;
}

const UserFilter: React.FC<UserFilterProps> = ({title, onSubmit}) => {
  const [name, setName] = useState<UserName>({
    title: '',
    first: '',
    last: '',
  });
  const [email, setEmail] = useState('');
  // const [id, setID] = useState<UserId>({value: 0});
  const [location, setLocation] = useState<UserLocation>({
    country: '',
    city: '',
    street: {
      name: '',
      number: 0,
    },
  });

  const handleSubmit = () => {
    // Create the user object to filter the users
    const filteredData: User = {
      id: 0,
      name,
      email,
      location,
      picture: undefined,
    };
    // Call the onSubmit callback with the user object
    onSubmit(filteredData);
  };

  const idPL = 'ID Number';
  const firstPL = 'First Name';
  const lastPL = 'Last Nmae';
  const emailPL = 'Email';
  const countryPL = 'Country';
  const cityPL = 'City';
  const nameTitle = 'Name:';
  const emailTitle = 'Email:';
  const locationTitle = 'Location:';

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.modalTitle}>{title}</Text>
        {/* <Text style={styles.sectionTitle}>{idPL}</Text>
        <TextInput
          style={[styles.input, styles.id]}
          placeholder={'ID'}
          placeholderTextColor={COLORS.placeholder}
          value={id}
          keyboardType="number-pad"
          onChangeText={setID}
        /> */}
        <Text style={styles.sectionTitle}>{nameTitle}</Text>
        <View style={styles.sectionRow}>
          <TextInput
            style={[styles.input, styles.firstName]}
            placeholder={firstPL}
            placeholderTextColor={COLORS.placeholder}
            value={name.first}
            onChangeText={text =>
              setName(prevState => ({...prevState, first: text}))
            }
          />
          <TextInput
            style={[styles.input, styles.lastName]}
            placeholder={lastPL}
            placeholderTextColor={COLORS.placeholder}
            value={name.last}
            onChangeText={text =>
              setName(prevState => ({...prevState, last: text}))
            }
          />
        </View>
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
      </View>
      <View style={styles.bottomContainer}>
        <SaveButton onButtonPress={handleSubmit} text="Search" />
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
    color: COLORS.modalTitle,
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
  id: {
    width: '100%',
  },
  firstName: {
    width: '47%',
    marginRight: '3%',
  },
  lastName: {},
  country: {
    width: '47%',
    marginRight: '3%',
  },
  city: {
    width: '50%',
  },
  bottomContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default UserFilter;

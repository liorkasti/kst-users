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

  const titlePL = 'Title';
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
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
});

export default UserFilter;

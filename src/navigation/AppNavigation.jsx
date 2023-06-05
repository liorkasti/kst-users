import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';

import plus from '../assets/plus.png';
import UserFormModal from '../components/UserForm';
import UserScreen from '../screens/UserScreen';
import EditScreen from '../screens/EditScreen';
import FormModal from '../components/FormModal';
import {COLORS} from '../utils/constance';

const Tab = createBottomTabNavigator();

const AppNavigation = ({navigation}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name={'User'}
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Text style={{color: focused ? COLORS.primary : COLORS.secondary}}>
              User
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name={'UserForm'}
        component={UserFormModal}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View>
              <TouchableOpacity onPress={handleOpenModal}>
                <View
                  style={{
                    width: 55,
                    height: 55,
                    backgroundColor: COLORS.primary,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: Platform.OS == 'android' ? 50 : 30,
                  }}>
                  <Image
                    source={plus}
                    style={{
                      width: 32,
                      height: 32,
                      tintColor: 'white',
                    }}
                  />
                </View>
              </TouchableOpacity>

              <FormModal
                visible={isModalOpen}
                onClose={() => setIsModalOpen(!isModalOpen)}
                modalSize={60}>
                <UserFormModal onClose={handleCloseModal} />
              </FormModal>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name={'Edit'}
        component={EditScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Text style={{color: focused ? COLORS.primary : COLORS.secondary}}>
              Edit
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppNavigation;

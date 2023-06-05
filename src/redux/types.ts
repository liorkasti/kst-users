import {ImageSourcePropType} from 'react-native/types';

export interface User {
  name: UserName;
  email: string;
  picture: UserPicture;
  location: UserLocation;
}
export interface UserName {
  title: string;
  first: string;
  last: string;
}
export interface UserLocation {
  country: string;
  city: string;
  street: UserStreet;
}
export interface UserStreet {
  name: string;
  number: number;
}
export interface UserPicture {
  medium: string;
}

export interface UsersState {
  data: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

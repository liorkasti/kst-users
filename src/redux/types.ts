export interface User {
  login: UserId;
  name: UserName;
  email: string;
  picture: UserPicture | undefined;
  location: UserLocation;
}
export interface UserId {
  uuid: string;
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
  medium: string | undefined;
}

export interface UsersState {
  data: User[];
  filteredData: [];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

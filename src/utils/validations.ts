import {User, UsersState} from '../redux/types';

export const validateEmail = (email: string) => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isEmailUnique = (users: User[], email: string): boolean => {
  const existingUser = users.find(user => user.email === email);
  return !existingUser;
};

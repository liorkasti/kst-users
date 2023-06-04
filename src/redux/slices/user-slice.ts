import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {UserState} from '../types';

const initialState: UserState = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    storeUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    removeUser: state => {
      state.username = '';
    },
  },
});

export const {storeUser, removeUser} = userSlice.actions;

export default userSlice.reducer;

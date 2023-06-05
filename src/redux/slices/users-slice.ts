import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {User, UsersState} from '../types';

const initialState: UsersState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchUsers = createAsyncThunk<User[], void, {rejectValue: string}>(
  'users/fetchUsers',
  async (_, {rejectWithValue}) => {
    try {
      const response: AxiosResponse<{results: User[]}> = await axios.get(
        'https://randomuser.me/api/?results=10',
      );
      AsyncStorage.setItem('users', JSON.stringify(response.data.results));
      return response.data.results;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      const newUser = action.payload;
      console.log({newUser});
      state.data.push(newUser);
    },
    editUser: (
      state,
      action: PayloadAction<{id: string; user: Partial<User>}>,
    ) => {
      const {id, user} = action.payload;
      const index = state.data.findIndex(u => u.email === id);
      console.log({index, id, user});
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...user,
        };
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      console.log('userId', userId);
      state.data = state.data.filter(user => user.email !== userId);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const {addUser, editUser, removeUser} = usersSlice.actions;

export default usersSlice.reducer;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {User, UsersState} from '../types';
import {Alert} from 'react-native';

const initialState: UsersState = {
  data: [],
  filteredData: [],
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
      state.data.push(newUser);
    },
    editUser: (
      state,
      action: PayloadAction<{id: string; user: Partial<User>}>,
    ) => {
      const {id, user} = action.payload;
      const index = state.data.findIndex(u => u.email === id);
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...user,
        };
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.data = state.data.filter(user => user.email !== userId);
    },
    filterUsers: (state, action: PayloadAction<string>) => {
      try {
        const searchEmail = action.payload?.email.trim().toLowerCase();
        const searchFirstName = action.payload?.name?.first.toLowerCase();
        const searchLastName = action.payload?.name?.last.toLowerCase();
        const searchCountry = action.payload?.location?.country.toLowerCase();
        const searchCity = action.payload?.location?.city.toLowerCase();
        // const searchId = action.payload?.id?.value;

        state.filteredData = state.data.filter(
          user =>
            // user.id.value.includes(searchId) &&
            user.email.toLowerCase().includes(searchEmail) &&
            user.name.first.toLowerCase().includes(searchFirstName) &&
            user.name.last.toLowerCase().includes(searchLastName) &&
            user.location.country.toLowerCase().includes(searchCountry) &&
            user.location.city.toLowerCase().includes(searchCity),
        );

        if (state.filteredData.length < 1) {
          Alert.alert('Sorry!', 'No result found.');
        }
        return;
      } catch (error) {
        console.log('Filter Users Error', error);
      }
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

export const {addUser, editUser, removeUser, filterUsers} = usersSlice.actions;

export default usersSlice.reducer;

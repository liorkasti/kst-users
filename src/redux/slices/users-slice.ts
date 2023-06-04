import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';

export interface User {
  id: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  picture: {
    medium: string;
  };
  location: {
    country: string;
    city: string;
    street: {
      name: string;
      number: number;
    };
  };
}

interface UsersState {
  data: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

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
      return response.data.results;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
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

export default usersSlice.reducer;

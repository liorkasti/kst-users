import {combineReducers, configureStore} from '@reduxjs/toolkit';
import usersSlice from './slices/users-slice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    users: usersSlice,
  },
  middleware: [thunk],
});

const rootReducer = combineReducers({
  users: usersSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;

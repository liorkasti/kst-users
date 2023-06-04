import {combineReducers, configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user-slice';
import usersSlice from './slices/users-slice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersSlice,
  },
  middleware: [thunk],
});

const rootReducer = combineReducers({
  user: userReducer,
  users: usersSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;

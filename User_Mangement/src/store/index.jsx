import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import usersReducer from './usersSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/userSlice';
import countriesReducer from '../features/countriesSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    countries: countriesReducer,
  },
});

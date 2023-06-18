import { configureStore } from '@reduxjs/toolkit';
import userRecucer from './slices/userSlice';

const store = configureStore({
  reducer: {
    user: userRecucer,
  },
});

export default store;

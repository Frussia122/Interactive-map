import { configureStore } from '@reduxjs/toolkit';
import userRecucer from './slices/userSlice';
import favoritesReducer from './slices/favoritesSlice';

const store = configureStore({
  reducer: {
    user: userRecucer,
    favorite: favoritesReducer,
  },
});

export default store;

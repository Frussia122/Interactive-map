import { configureStore } from '@reduxjs/toolkit';
import userRecucer from './slices/userSlice';
import favoritesReducer from './slices/favoritesSlice';
import controlsReducer from './slices/controlsSlice';

const store = configureStore({
  reducer: {
    user: userRecucer,
    favorite: favoritesReducer,
    controls: controlsReducer,
  },
});

export default store;

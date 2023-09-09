import { configureStore } from '@reduxjs/toolkit';
import userRecucer from 'shared/models/slices/userSlice';
import favoritesReducer from 'shared/models/slices/favoritesSlice';
import controlsReducer from 'shared/models/slices/controlsSlice';
import controlsDataReducer from 'shared/models/slices/controlsDataSlice';
import mapDataReducer from 'shared/models/slices/mapSlice';

const store = configureStore({
  reducer: {
    user: userRecucer,
    favorite: favoritesReducer,
    controls: controlsReducer,
    controlsData: controlsDataReducer,
    map: mapDataReducer,
  },
});

export default store;

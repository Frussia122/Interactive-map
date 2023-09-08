/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    status: null,
    error: null,
  },
  reducers: {
    setFavorite(state, action) {
      state.favorites = action.payload;
    },
    addToFavorite(state, action) {
      const existingPlace = state.favorites.find(
        (place) => place.id === action.payload.id,
      );
      if (!existingPlace) {
        state.favorites.push({
          id: action.payload.id,
          name: action.payload.name,
          description: action.payload.description,
          coords: action.payload.coords,
        });
      }
    },
    removeFromFavorite(state, action) {
      state.favorites = state.favorites.filter(
        (place) => place.id !== action.payload.id,
      );
    },
    clearFavorites(state) {
      state.favorites = [];
    },
  },
});

// ...
export const {
  setFavorite,
  addToFavorite,
  removeFromFavorite,
  clearFavorites,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;

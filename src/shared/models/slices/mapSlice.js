/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mapRef: null,
};

const mapSlice = createSlice({
  name: 'mapData',
  initialState,
  reducers: {
    setMapRef(state, action) {
      state.mapRef = action.payload;
    },
  },
});

export const currentMapRef = (state) => state.mapData.mapRef;
export const { setMapRef } = mapSlice.actions;
export default mapSlice.reducer;

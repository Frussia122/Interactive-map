/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputValue: '',
  places: null,
  multiRouteCoords: null,
  routeFrom: '',
  routeTo: '',
};

const controlsDataSlice = createSlice({
  name: 'controlsData',
  initialState,
  reducers: {
    setInputValue(state, action) {
      state.inputValue = action.payload;
    },
    setCurrentPlaces(state, action) {
      state.places = action.payload;
    },
    setMultiRouteCoords(state, action) {
      state.multiRouteCoords = action.payload;
    },
    setRouteTo(state, action) {
      state.routeTo = action.payload;
    },
    setRouteFrom(state, action) {
      state.routeFrom = action.payload;
    },
  },
});

export const currentInputValue = (state) => state.controlsData.inputValue;
export const AllPlaces = (state) => state.controlsData.places;
export const currentMultiRouteCoords = (state) => state.controlsData.multiRouteCoords;
export const currentRouteFrom = (state) => state.controlsData.routeFrom;
export const currentRouteTo = (state) => state.controlsData.routeTo;

export const {
  setInputValue,
  setCurrentPlaces,
  setMultiRouteCoords,
  setRouteTo,
  setRouteFrom,
} = controlsDataSlice.actions;

export default controlsDataSlice.reducer;

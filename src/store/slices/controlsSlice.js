/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  placesPanel: false,
  isClose: false,
  routePanel: false,
};

const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  reducers: {
    setPlacesPanel(state, action) {
      state.placesPanel = action.payload;
    },
    setIsClose(state, action) {
      state.isClose = action.payload;
    },
    setRoutePanel(state, action) {
      state.routePanel = action.payload;
    },
  },
});

export const currentPlacesPanel = (state) => state.controls.placesPanel;
export const currentIsClose = (state) => state.controls.isClose;
export const currentRoutePanel = (state) => state.controls.routePanel;

export const { setPlacesPanel, setIsClose, setRoutePanel } = controlsSlice.actions;
export default controlsSlice.reducer;

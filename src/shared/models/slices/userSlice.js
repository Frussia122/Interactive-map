import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userName: null,
  email: null,
  token: null,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        userName: action.payload.userName,
        email: action.payload.email,
        token: action.payload.token,
        id: action.payload.id,
      };
    },
    removeUser(state) {
      return {
        ...state,
        userName: null,
        email: null,
        token: null,
        id: null,
      };
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export const currentUser = (state) => state.user.id;
export default userSlice.reducer;

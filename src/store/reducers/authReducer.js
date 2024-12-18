import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.user = {
        role: action.payload.role,
        email: action.payload.email,
        name: action.payload.name,
      };
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;

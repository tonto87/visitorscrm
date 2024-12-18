import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    addNotification: (state, action) => {
      state.data.push(action.payload);
    },

    deleteNotification: (state, action) => {
      state.data = state.data.filter(
        (notification) => notification.id !== action.payload.id,
      );
    },

    markAsRead: (state, action) => {
      const index = state.data.findIndex(
        (notification) => notification.id === action.payload.id,
      );
      if (index !== -1) {
        state.data[index].read = true;
      }
    },

    setNotifications: (state, action) => {
      state.data = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addNotification,
  deleteNotification,
  markAsRead,
  setNotifications,
  setLoading,
  setError,
} = notificationSlice.actions;

export default notificationSlice.reducer;

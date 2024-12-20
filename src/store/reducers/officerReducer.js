import { createSlice } from "@reduxjs/toolkit";

const officerSlice = createSlice({
  name: "officers",
  initialState: {
    data: [],
    loading: false,
    meta: {},
  },
  reducers: {
    addOfficer: (state, action) => {
      const updatedState = [...state, action.payload];
      return updatedState;
    },
    deleteOfficer: (state, action) => {
      return state.filter((officer) => officer.id !== action.payload.id);
    },
    editOfficer: (state, action) => {
      return state.map((officer) =>
        officer.id === action.payload.id
          ? { ...officer, ...action.payload.data }
          : officer,
      );
    },

    setOfficers: (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
    setOfficerMeta: (state, action) => {
      return {
        ...state,
        meta: action.payload,
      };
    },
  },
});

export const {
  addOfficer,
  deleteOfficer,
  editOfficer,
  setOfficers,
  setLoading,
  setOfficerMeta,
} = officerSlice.actions;

export default officerSlice.reducer;

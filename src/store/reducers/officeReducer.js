import { createSlice } from "@reduxjs/toolkit";

const officeSlice = createSlice({
  name: "offices",
  initialState: {
    data: [],
    loading: false,
    meta: {},
  },
  reducers: {
    addOffice: (state, action) => {
      const updatedState = [...state, action.payload];
      return updatedState;
    },
    deleteOffice: (state, action) => {
      return state.filter((office) => office.id !== action.payload.id);
    },
    editOffice: (state, action) => {
      return state.map((office) =>
        office.id === action.payload.id
          ? { ...office, ...action.payload.data }
          : office,
      );
    },

    setOffices: (state, action) => {
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
    setOfficeMeta: (state, action) => {
      return {
        ...state,
        meta: action.payload,
      };
    },
  },
});

export const {
  addOffice,
  deleteOffice,
  editOffice,
  setOffices,
  setLoading,
  setOfficeMeta,
} = officeSlice.actions;

export default officeSlice.reducer;

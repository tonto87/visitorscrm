import { createSlice } from "@reduxjs/toolkit";

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    data: [],
    loading: false,
    meta: {},
  },
  reducers: {
    addDepartment: (state, action) => {
      const updatedState = [...state, action.payload];
      return updatedState;
    },
    deleteDepartment: (state, action) => {
      return state.filter((department) => department.id !== action.payload.id);
    },
    editDepartment: (state, action) => {
      return state.map((department) =>
        department.id === action.payload.id
          ? { ...department, ...action.payload.data }
          : department,
      );
    },
    setDepartments: (state, action) => {
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
    setDepartmentMeta: (state, action) => {
      return {
        ...state,
        meta: action.payload,
      };
    },
  },
});

export const {
  addDepartment,
  deleteDepartment,
  editDepartment,
  setDepartments,
  setLoading,
  setDepartmentMeta,
} = departmentSlice.actions;

export default departmentSlice.reducer;

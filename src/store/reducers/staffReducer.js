import { createSlice } from "@reduxjs/toolkit";

const staffSlice = createSlice({
  name: "staffs",
  initialState: [
    {
      id: "1",
      name: "User",
      username: "",
      email: "user@user.com",
      phone: "555 555 555",
      extension: "erhtj",
      position: "A",
      role: "Manager",
      office: "",
      department: "",
      password: "",
      passwordConfirm: "",
      active: "true",
    },
  ],
  reducers: {
    addStaff: (state, action) => {
      const existingStaff = state.find(
        (staff) => staff.id === action.payload.id,
      );
      if (existingStaff) {
        alert("Already exists");
        return state;
      }
      const updatedState = [
        ...state,
        { ...action.payload, createdAt: new Date().toISOString() },
      ];
      return updatedState;
    },
    deleteStaff: (state, action) => {
      return state.filter((staff) => staff.id !== action.payload.id);
    },
    editStaff: (state, action) => {
      return state.map((staff) =>
        staff.id === action.payload.id
          ? {
              ...staff,
              ...action.payload.data,
              updatedAt: new Date().toISOString(),
            }
          : staff,
      );
    },
    filterStaff: (state, action) => {
      return state.filter((staff) =>
        staff.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    updateStaff: (state, action) => {
      const { id, personNonGrata, reason } = action.payload;
      const staffIndex = state.findIndex((staff) => staff.id === id);
      if (staffIndex !== -1) {
        state[staffIndex] = {
          ...state[staffIndex],
          personNonGrata,
          reason,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    updatePersona: (state, action) => {
      const { id, reason } = action.payload;
      const staffIndex = state.findIndex((staff) => staff.id === id);
      if (staffIndex !== -1) {
        state[staffIndex] = {
          ...state[staffIndex],
          reason,
          updatedAt: new Date().toISOString(),
        };
      }
    },
  },
});

export const {
  addStaff,
  deleteStaff,
  editStaff,
  filterStaff,
  updateStaffr,
  updatePersona,
} = staffSlice.actions;

export default staffSlice.reducer;

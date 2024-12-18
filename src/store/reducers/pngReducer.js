import { createSlice } from "@reduxjs/toolkit";

const pngReducer = createSlice({
  name: "personas",
  initialState: [],
  reducers: {
    addPersona: (state, action) => {
      const existingPersona = state.find(
        (persona) =>
          persona.name.toLowerCase() === action.payload.name.toLowerCase(),
      );
      if (existingPersona) {
        return state;
      } else {
        return [...state, action.payload];
      }
    },
    deletePersona: (state, action) => {
      return state.filter((persona) => persona.id !== action.payload.id);
    },
  },
});

export const { addPersona, deletePersona } = pngReducer.actions;
export default pngReducer.reducer;

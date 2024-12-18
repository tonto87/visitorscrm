import { createSlice } from "@reduxjs/toolkit";

const visitorSlice = createSlice({
  name: "visitors",
  initialState: {
    data: [
      {
        id: "2",
        name: "Admin",
        phone: "555 555 555",
        fin: "edhrfjr",
        email: "user",
        address: "B",
        tag: "person non grata",
        reason: "",
      },
      {
        id: "3",
        name: "Person",
        phone: "555 555 555",
        fin: "jtydjrt",
        email: "user",
        address: "C",
        tag: "true",
        reason: "",
      },
      {
        id: "4",
        name: "Kuku",
        phone: "555 555 555",
        fin: "jtukfjd",
        email: "user",
        address: "D",
        tag: "true",
        reason: "",
      },
    ],
    loading: false,
    meta: null,
  },

  reducers: {
    setVisitors(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setVisitorMeta(state, action) {
      state.meta = action.payload;
    },
    addVisitor: (state, action) => {
      state.data.push({
        ...action.payload,
        createdAt: new Date().toISOString(),
      });
    },
    deleteVisitor: (state, action) => {
      state.data = state.data.filter(
        (visitor) => visitor.id !== action.payload.id,
      );
    },
    editVisitor: (state, action) => {
      state.data = state.data.map((visitor) =>
        visitor.id === action.payload.id
          ? {
              ...visitor,
              ...action.payload.data,
              updatedAt: new Date().toISOString(),
            }
          : visitor,
      );
    },
    filterVisitor: (state, action) => {
      state.data = state.data.filter((visitor) =>
        visitor.name.toLowerCase().includes(action.payload.toLowerCase()),
      );
    },
    updateVisitor: (state, action) => {
      const { id, tag, reason } = action.payload;
      const visitorIndex = state.data.findIndex((visitor) => visitor.id === id);

      if (visitorIndex === -1) return;

      state.data[visitorIndex] = {
        ...state.data[visitorIndex],
        tag,
        reason,
        updatedAt: new Date().toISOString(),
      };
    },
    updatePersona: (state, action) => {
      const { id, reason } = action.payload;
      const visitorIndex = state.data.findIndex((visitor) => visitor.id === id);

      if (visitorIndex === -1) return;

      state.data[visitorIndex] = {
        ...state.data[visitorIndex],
        reason,
        updatedAt: new Date().toISOString(),
      };
    },
    setVisitorsMeta: (state, action) => {
      state.meta = action.payload;
    },
  },
});

export const {
  addVisitor,
  deleteVisitor,
  editVisitor,
  filterVisitor,
  updateVisitor,
  updatePersona,
  setVisitors,
  setLoading,
  setVisitorsMeta,
} = visitorSlice.actions;

export default visitorSlice.reducer;

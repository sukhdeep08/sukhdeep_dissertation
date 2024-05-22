import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  asc: false,
  desc: false,
  five: false,
  one: false,
  above: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateState(state, action) {
      return {
        ...initialState,
        [action.payload]: true,
      };
    },
    reset() {
      return initialState;
    },
  },
});

export const { updateState, reset } = filterSlice.actions;

export default filterSlice.reducer;

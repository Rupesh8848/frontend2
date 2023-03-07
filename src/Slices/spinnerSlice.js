import { createSlice } from "@reduxjs/toolkit";

const spinnerSlice = createSlice({
  name: "Spinner",
  initialState: { spinnerState: "hidden" },
  reducers: {
    showSpinner(state, action) {
      state.spinnerState = "show";
    },
    hideSpinner(state, action) {
      state.spinnerState = "hidden";
    },
  },
});

export const { showSpinner, hideSpinner } = spinnerSlice.actions;
export default spinnerSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setUserData = createAsyncThunk(
  "set/userData",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    return payload;
  }
);

const userData = createSlice({
  name: "UserData",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(setUserData.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      });
  },
});

export default userData.reducer;

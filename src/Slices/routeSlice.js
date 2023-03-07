import { createSlice } from "@reduxjs/toolkit";

const routeSlice = createSlice({
  name: "Route",
  initialState: {},
  reducers: {
    updateRoute(state, action) {
      console.log(action.payload);
      state.data = action.payload;
    },
  },
});

export default routeSlice.reducer;
export const { updateRoute } = routeSlice.actions;

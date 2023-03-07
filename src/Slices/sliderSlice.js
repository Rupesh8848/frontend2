import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "Slider",
  initialState: { sliderState: "public" },
  reducers: {
    setSliderToPublic(state, action) {
      state.sliderState = "public";
    },
    setSliderToPrivate(state, action) {
      state.sliderState = "protected";
    },
  },
});

export default sliderSlice.reducer;
export const { setSliderToPrivate, setSliderToPublic } = sliderSlice.actions;

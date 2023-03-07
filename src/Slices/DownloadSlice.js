import { createSlice } from "@reduxjs/toolkit";

const downloadSlice = createSlice({
  name: "Download",
  initialState: { downloadList: [] },
  reducers: {
    addFileToDownload(state, action) {
      if (!state.downloadList.includes(action.payload)) {
        state.downloadList.push(action.payload);
      }
    },
    removeFileFromDownload(state, action) {
      state.downloadList = state.downloadList.filter(
        (file) => file.cid !== action.payload.cid
      );
    },
  },
});

export default downloadSlice.reducer;
export const { addFileToDownload, removeFileFromDownload } =
  downloadSlice.actions;

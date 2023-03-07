import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import { connectMetaMask } from "../setup";
import { getPublicKeyFromUserAccount } from "../Utils/getPublicKey";
import { setUserData } from "./userDataSlice";

export const setUser = createAsyncThunk(
  "user/set",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const userMetaMaskId = await connectMetaMask();
      const response = await axios.get(`${baseUrl}/api/user/${userMetaMaskId}`);
      const userPublicKey = await getPublicKeyFromUserAccount(
        response.data.userMetaMaskId
      );
      dispatch(
        setUserData({
          files: response.data.files,
          folders: response.data.folders,
        })
      );

      return { ...response.data, publicKey: userPublicKey };
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "User",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(setUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(setUser.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      });
  },
});

export default userSlice.reducer;

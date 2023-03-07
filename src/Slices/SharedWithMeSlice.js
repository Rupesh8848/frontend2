import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import { Address } from "../Utils/ContractAddress";
import PublicABI from "../Utils/PublicABI.json";
import PrivateABI from "../Utils/PrivateABI.json";

export const getFilesSharedWithMe = createAsyncThunk(
  "get/sharedWithMe",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { User } = getState();
    const userAccountId = User?.data?.userMetaMaskId;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.Publicupload[0],
      PublicABI.abi,
      signer
    );

    const res = await contract.getsharedwithuser(userAccountId);
    console.log(res);
    // await res.wait();
    const data = [];
    const imgExt = ["jpg", "gif", "jpeg", "png"];
    res.forEach((element) => {
      //   //   console.log(`Name: ${element.name}`);
      //   //   console.log(`CID: ${element.CID}`);

      const fileExt = element.name.split(".").slice(-1)[0];
      console.log(fileExt);
      data.push({
        name: element.name,
        cid: element.CID,
        fileType: imgExt.includes(fileExt) ? "image" : null,
        protected: "public",
      });
    });
    return data;
  }
);

export const getProtectedFilesSharedWithMe = createAsyncThunk(
  "get/PrivateShare",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    const { User } = getState();
    const userAccountId = User?.data?.userMetaMaskId;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.privateupload[0],
      PrivateABI.abi,
      signer
    );

    const res = await contract.getsharedwithuser(userAccountId);
    console.log(res);
    const data = [];

    res.forEach((element) => {
      //   //   console.log(`Name: ${element.name}`);
      //   //   console.log(`CID: ${element.CID}`);

      const fileExt = element.name.split(".").slice(-1)[0];
      console.log(fileExt);
      data.push({
        name: element.name,
        cid: element.CID,
        protected: "protected",
        key: element.key,
        iv: element.iv,
      });
    });
    return data;
  }
);

const sharedWithMeSlice = createSlice({
  name: "ShareWithMe",
  initialState: { loading: false },
  extraReducers: (builder) => {
    builder
      .addCase(getFilesSharedWithMe.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFilesSharedWithMe.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getFilesSharedWithMe.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      })
      .addCase(getProtectedFilesSharedWithMe.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProtectedFilesSharedWithMe.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProtectedFilesSharedWithMe.rejected, (state, action) => {
        state.loading = false;
        state.appErr = action?.payload?.message;
        state.serveErr = action?.error?.message;
      });
  },
});

export default sharedWithMeSlice.reducer;

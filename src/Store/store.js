import { configureStore } from "@reduxjs/toolkit";
import DownloadSlice from "../Slices/DownloadSlice";
import recentSlice from "../Slices/recentSlice";
import routeSlice from "../Slices/routeSlice";
import SharedWithMeSlice from "../Slices/SharedWithMeSlice";
import sliderSlice from "../Slices/sliderSlice";
import spinnerSlice from "../Slices/spinnerSlice";
import userDataSlice from "../Slices/userDataSlice";
import userSlice from "../Slices/userSlice";

const Store = configureStore({
  reducer: {
    User: userSlice,
    userData: userDataSlice,
    slider: sliderSlice,
    spinner: spinnerSlice,
    download: DownloadSlice,
    recent: recentSlice,
    sharedWithMe: SharedWithMeSlice,
    route: routeSlice,
  },
});

export default Store;

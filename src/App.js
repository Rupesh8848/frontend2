import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DownloadSelected from "./Components/DownloadSelected";
import MainContainer from "./Components/MainContainer";
import Navbar from "./Components/Navbar";
import SideBar from "./Components/SideBar";
import Spinner from "./Components/Spinner";
import UploadModal from "./Components/UploadModal";
import { hideSpinner, showSpinner } from "./Slices/spinnerSlice";
import { setUser } from "./Slices/userSlice";
import "./App.styles.css";
import ShareModal from "./Components/ShareModal";
import { useLocation } from "react-router-dom";
import { updateRoute } from "./Slices/routeSlice";
import {
  getPublicKey,
  getPublicKeyFromUserAccount,
} from "./Utils/getPublicKey";

function App() {
  const dispatch = useDispatch();
  const [uploadModalVisible, setUploadModalVisible] = React.useState(false);
  const [shareModalVisible, setShareModalVisible] = React.useState(false);

  const [loadStateComplete, setLoadStateComplete] = React.useState(false); //checks if the data has been loaded at the begining of the app

  const { spinnerState } = useSelector((state) => state.spinner);
  const { User } = useSelector((state) => state);

  const { downloadList } = useSelector((state) => state.download);

  const [currentTab, setCurrentTab] = React.useState(1);

  React.useEffect(() => {
    async function main() {
      dispatch(showSpinner());
      setLoadStateComplete(false);
      await dispatch(setUser());
      setLoadStateComplete(true);
      dispatch(hideSpinner());
    }
    main();
  }, []);

  return (
    <>
      {spinnerState === "show" && <Spinner />}
      {loadStateComplete && (
        <div
          className={`${
            uploadModalVisible ? "h-[100vh] overflow-hidden" : null
          }`}
        >
          <span>
            {downloadList.length > 0 &&
              `${downloadList.length} files selected.`}
          </span>
          <span>{downloadList.length > 0 && <DownloadSelected />}</span>
          <span>
            {downloadList.length > 0 && (
              <div
                onClick={() => setShareModalVisible(true)}
                className="border-solid border-[2px] border-black px-4 py-2 inline-block w-[70px] cursor-pointer mt-4 rounded-[10px] hover:bg-[rgb(64,107,159)] hover:text-white hover:shadow-sm transition-all"
              >
                Share
              </div>
            )}
          </span>
          <div className="h-[100vh]">
            <Navbar />
            <main className="main flex">
              <SideBar
                setUploadModalVisible={setUploadModalVisible}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
                className="sidebar z-0"
              />
              <MainContainer className="main-container" />
            </main>
          </div>

          {/* <ShareModal /> */}

          {uploadModalVisible && (
            <UploadModal modalVisToggler={setUploadModalVisible} />
          )}
          {shareModalVisible && (
            <ShareModal modalShareToggler={setShareModalVisible} />
          )}
        </div>
      )}
    </>
  );
}

export default App;

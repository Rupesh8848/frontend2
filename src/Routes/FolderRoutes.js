import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { baseUrl } from "../BaseUrl";
import FileRenderer from "../Components/FileRenderer";
import FolderRenderer from "../Components/FolderRenderer";
import { updateRoute } from "../Slices/routeSlice";
import { setUserData } from "../Slices/userDataSlice";

export default function FolderRoutes() {
  const { folderId } = useParams();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state);
  const location = useLocation();
  // console.log(location?.pathname?.split("/"));
  React.useEffect(() => {
    async function getData() {
      const response = await axios.get(`${baseUrl}/api/folder/${folderId}`);
      dispatch(
        setUserData({
          folders: response.data.folders,
          files: response.data.contains,
        })
      );
      dispatch(updateRoute(location?.pathname?.split("/")));
    }
    getData();
  }, [location]);
  return (
    !userData.loading && (
      <div>
        {/* <RecentlyOpened /> */}

        <span>Folders:</span>
        <FolderRenderer folders={userData?.data?.folders} />
        <span>Files:</span>
        <FileRenderer files={userData?.data?.files} />
      </div>
    )
  );
}

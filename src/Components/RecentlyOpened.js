import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getFourRecent } from "../Slices/recentSlice";
import FileRenderer from "./FileRenderer";

export default function RecentlyOpened() {
  const { recent } = useSelector((state) => state);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getFourRecent());
  }, []);
  return (
    <>
      <div>Recently Opened:</div>
      {recent?.recentFour?.dataToSend === 0 ? (
        <div>No Recent Files</div>
      ) : (
        <FileRenderer files={recent?.recentFour?.dataToSend} />
      )}
      <Outlet />
    </>
  );
}

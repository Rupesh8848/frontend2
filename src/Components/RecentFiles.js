import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecent } from "../Slices/recentSlice";
import { updateRoute } from "../Slices/routeSlice";
import FileRenderer from "./FileRenderer";

export default function RecentFiles() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.recent);
  //   data.dataToSend => []
  React.useEffect(() => {
    dispatch(getRecent());
    dispatch(updateRoute(["recent"]));
  }, []);
  return data?.loading ? (
    <div>Loading Data</div>
  ) : (
    <>
      <div>Recent Files:</div>
      <FileRenderer files={data?.dataToSend} />
    </>
  );
}

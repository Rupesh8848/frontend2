import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRoute } from "../Slices/routeSlice";
import {
  getFilesSharedWithMe,
  getProtectedFilesSharedWithMe,
} from "../Slices/SharedWithMeSlice";
import FileRenderer from "./FileRenderer";

export default function SharedWithMe() {
  const dispatch = useDispatch();
  const { sharedWithMe } = useSelector((state) => state);
  const { slider } = useSelector((state) => state);

  console.log(sharedWithMe);
  React.useEffect(() => {
    slider.sliderState === "public"
      ? dispatch(getFilesSharedWithMe())
      : dispatch(getProtectedFilesSharedWithMe());
    dispatch(updateRoute(["sharedWithMe"]));
  }, [slider.sliderState]);

  return (
    <>
      <div>Shared With Me</div>
      {!SharedWithMe?.loading && <FileRenderer files={sharedWithMe?.data} />}
    </>
  );
}

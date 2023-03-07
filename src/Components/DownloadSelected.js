import axios from "axios";
import React from "react";
import fileDownload from "js-file-download";
import "./DownloadSelected.css";
import { useDispatch, useSelector } from "react-redux";
import { hideSpinner, showSpinner } from "../Slices/spinnerSlice";
import { getProtectedFile, getYourFile } from "../Utils/getYourFile";
import { useLocation } from "react-router-dom";

export default function DownloadSelected() {
  const dispatch = useDispatch();
  const { downloadList } = useSelector((state) => state.download);
  const urls = [];
  const currentRoute = useLocation();

  const { User } = useSelector((state) => state);

  const downloadSelected = async () => {
    console.log(currentRoute);
    dispatch(showSpinner());
    for (let obj of downloadList) {
      const { cid, name } = obj;
      if (obj.protected === "public") {
        let link = `https://${cid}.ipfs.w3s.link/${name}`;
        urls.push({ link, name });
      } else {
        currentRoute?.pathname === "/shareWithMe"
          ? await getProtectedFile(cid, User.data.publicKey)
          : await getYourFile(cid, User.data.publicKey);
      }
    }

    if (urls.length > 0) {
      for (let obj of urls) {
        await axios.get(obj.link, { responseType: "blob" }).then((res) => {
          fileDownload(res.data, obj.name);
        });
      }
    }
    dispatch(hideSpinner());
  };
  return (
    <button onClick={downloadSelected} className="downloadButton">
      Download Selected
    </button>
  );
}

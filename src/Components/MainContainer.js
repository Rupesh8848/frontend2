import React from "react";
import { Route, Routes } from "react-router-dom";
import FolderRoutes from "../Routes/FolderRoutes";
import MainContainerRoute from "../Routes/MainContainerRoute";
import RecentFiles from "./RecentFiles";
import RecentlyOpened from "./RecentlyOpened";
import SharedWithMe from "./SharedWithMe";

export default function MainContainer() {
  return (
    <>
      <div className="pl-8 ">
        {/* <RecentlyOpened /> */}
        <Routes>
          <Route index element={<MainContainerRoute />} />
          <Route path="/user/folder/:folderId" element={<FolderRoutes />} />
          {/* <Route path="/" element={<RecentlyOpened />}>
          </Route> */}
          <Route path="/recent" element={<RecentFiles />} />
          <Route path="/shareWithMe" element={<SharedWithMe />} />
        </Routes>
      </div>
    </>
  );
}

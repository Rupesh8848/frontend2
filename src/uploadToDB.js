import { baseUrl } from "./BaseUrl";

import axios from "axios";

export const uploadFileToDb = async ({ fileObj, user }) => {
  const response = await axios.post(`${baseUrl}/api/file`, {
    name: fileObj.name,
    cid: fileObj.cid,
    size: fileObj.size,
    user: user._id,
    protected: fileObj.protected,
    fileType: fileObj.fileType,
  });
  console.log(response);
};

export const uploadFileToNestedFolder = async ({ fileObj, user, folderId }) => {
  const response = await axios.post(`${baseUrl}/api/file`, {
    name: fileObj.name,
    cid: fileObj.cid,
    size: fileObj.size,
    user: user._id,
    containingFolder: folderId,
    protected: fileObj.protected,
  });
  console.log(response);
};

export const uploadFolderToDb = async ({ folderName, user }) => {
  const response = await axios.post(`${baseUrl}/api/folder`, {
    folderName,
    user,
  });
  return response;
};

export const uploadFileToFolder = async ({ fileObj, folderObj, user }) => {
  console.log("Upload to folder", folderObj.data);
  const response = await axios.post(`${baseUrl}/api/file`, {
    name: fileObj.name,
    cid: fileObj.cid,
    size: fileObj.size,
    user: user._id,
    containingFolder: folderObj.data._id,
    protected: fileObj.protected,
  });
  console.log(response);
};

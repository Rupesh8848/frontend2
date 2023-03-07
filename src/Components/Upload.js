import { ethers } from "ethers";
import React from "react";
import { Address } from "../Utils/ContractAddress";
import PublicABI from "../Utils/PublicABI.json";
import PrivateABI from "../Utils/PrivateABI.json";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import {
  uploadFileToDb,
  uploadFileToFolder,
  uploadFileToNestedFolder,
} from "../uploadToDB";
import { startEncryption } from "../encFunctions";
import { createClient } from "../Utils/createClient";
import { useDispatch, useSelector } from "react-redux";
import { hideSpinner, showSpinner } from "../Slices/spinnerSlice";
import { setUser } from "../Slices/userSlice";
import { useLocation } from "react-router-dom";
import { encryptKeyIV, getPublicKeyFromMetaMask } from "../Utils/getPublicKey";

export default function Upload({ files, modalVisToggler }) {
  const [createFolder, setCreateFolder] = React.useState(false);
  const { sliderState } = useSelector((state) => state.slider);
  const [folderName, setFolderName] = React.useState("");
  const client = createClient();

  const { User, route } = useSelector((state) => state);

  const user = User.data;

  const dispatch = useDispatch();

  async function handleFileUpload() {
    dispatch(showSpinner());

    const isInsideFolder = route.data.includes("folder");

    const fileCids = [];

    for (let file of files) {
      const cid = await client.put([file]);
      console.log(file);
      fileCids.push({
        cid,
        name: file.name,
        size: file.size,
        fileType: file.type,
      });
    }

    console.log(fileCids);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.Publicupload[0],
      PublicABI.abi,
      signer
    );
    try {
      console.log(fileCids);
      var folderObj;
      if (createFolder && !isInsideFolder) {
        folderObj = await axios.post(`${baseUrl}/api/folder`, {
          name: folderName,
          user,
        });
      } else if (createFolder && isInsideFolder) {
        console.log("This got fired");
        folderObj = await axios.post(
          `${baseUrl}/api/folder/nestedFolder/${route.data[3]}`,
          {
            name: folderName,
            user,
          }
        );
      }
      for (let fileObj of fileCids) {
        // const response = await contract.addcid(fileObj.cid, fileObj.name);
        // await response.wait();
        if (!createFolder && !isInsideFolder) {
          await uploadFileToDb({ fileObj, user });
        } else if (!createFolder && isInsideFolder) {
          const folderId = route.data[3];
          await uploadFileToNestedFolder({ fileObj, user, folderId });
        } else {
          await uploadFileToFolder({ fileObj, user, folderObj });
        }
      }
      console.log("File successfully added to blockchain");
    } catch (error) {
      console.log("Error adding file");
    }

    // setLoaderState(false);
    dispatch(setUser());
    modalVisToggler(false);
    dispatch(hideSpinner());
  }

  async function handlePrivateFileUpload() {
    // setLoaderState(true);
    dispatch(showSpinner());
    const fileCids = [];
    const isInsideFolder = route.data.includes("folder");

    for (let file of files) {
      var { enc, iv, key } = await startEncryption(file);

      console.log(`Real Key: ${key} \n Real IV: ${iv}`);
      console.log(`Type of IV: ${typeof iv}`);

      var { encKey, encIV } = await encryptKeyIV(
        key,
        iv,
        User?.data?.publicKey
      );
      const cid = await client.put([enc]);
      fileCids.push({
        cid,
        name: file.name,
        size: file.size,
        protected: "protected",
      });
    }

    console.log(fileCids);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      Address.privateupload[0],
      PrivateABI.abi,
      signer
    );
    try {
      console.log(fileCids);
      var folderObj;
      if (createFolder && !isInsideFolder) {
        folderObj = await axios.post(`${baseUrl}/api/folder`, {
          name: folderName,
          user,
        });
      } else if (createFolder && isInsideFolder) {
        console.log("This got fired");
        folderObj = await axios.post(
          `${baseUrl}/api/folder/nestedFolder/${route.data[3]}`,
          {
            name: folderName,
            user,
          }
        );
      }
      for (let fileObj of fileCids) {
        const buffer = Buffer.from(iv.buffer);
        const inv = buffer.toString("hex");
        const response = await contract.addcid(
          fileObj.cid,
          fileObj.name,
          encKey,
          encIV
        );
        await response.wait();
        if (!createFolder && !isInsideFolder) {
          await uploadFileToDb({ fileObj, user });
        } else if (!createFolder && isInsideFolder) {
          const folderId = route.data[3];
          await uploadFileToNestedFolder({ fileObj, user, folderId });
        } else {
          await uploadFileToFolder({ fileObj, user, folderObj });
        }
      }
      console.log("File successfully added to blockchain");
    } catch (error) {
      console.log("Error adding file");
    }
    dispatch(setUser());
    modalVisToggler(false);
    dispatch(hideSpinner());
    // setLoaderState(false);
  }
  return (
    <div className="mt-[1rem] flex gap-2">
      {createFolder && (
        <input
          placeholder="Folder Name"
          value={folderName}
          onChange={(event) => setFolderName(event.target.value)}
        />
      )}
      <button
        onClick={() => setCreateFolder((oldState) => !oldState)}
        className="px-[10px] py-[5px] border-[2px] border-solid border-[rgba(0,0,0,0.5)]"
      >
        {!createFolder ? "Create Folder" : "Cancel Folder"}
      </button>
      <button
        className="px-[10px] py-[5px] border-[2px] border-solid border-[rgba(0,0,0,0.5)]"
        onClick={() => {
          sliderState === "public"
            ? handleFileUpload()
            : handlePrivateFileUpload();
        }}
        disabled={files.length === 0 ? true : false}
      >
        Upload
      </button>
    </div>
  );
}

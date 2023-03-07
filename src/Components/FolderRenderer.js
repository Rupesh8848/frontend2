import axios from "axios";
import React from "react";
import { FaFolder } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../BaseUrl";
import { setUserData } from "../Slices/userDataSlice";

export default function FolderRenderer({ folders }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleClick(id) {
    const response = await axios.get(`${baseUrl}/api/folder/${id}`);
    dispatch(setUserData(response.data.contains));
    navigate(`/user/folder/${id}`);
  }
  return !folders?.length == 0 ? (
    <div>
      {folders?.map((folder) => {
        // console.log(folder);
        return (
          <div
            className="flex items-center gap-[10px] border-[2px] inline-block w-fit px-[20px] py-[10px] rounded-[10px] cursor-pointer my-[20px]"
            key={folder._id}
            onClick={() => handleClick(folder._id)}
          >
            <FaFolder className="scale-150 text-[rgb(95,99,104)]" />{" "}
            {folder.name}
          </div>
        );
      })}
    </div>
  ) : (
    <div>No folders</div>
  );
}

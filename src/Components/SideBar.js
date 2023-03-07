import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdOutlineGroup } from "react-icons/md";
import { TbClock } from "react-icons/tb";
import { FiHardDrive } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearRecent } from "../Slices/recentSlice";

export default function SideBar({
  setUploadModalVisible,
  currentTab,
  setCurrentTab,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <section className="flex flex-col border-r-[1px] pr-[1rem] pt-4 h-[100%] bg-white ">
      <div
        onClick={() => setUploadModalVisible(true)}
        className=" flex justify-center w-[10rem] gap-1 border-[1px] ml-4 items-center font-semibold text-[1.2rem] px-[10px] py-[5px] rounded-full  cursor-pointer shadow hover:bg-[rbg(94,95,107)] hover:bg-[rgb(235,235,235)] hover:shadow-lg hover:translate-y-[-2px]"
      >
        <FaPlus />
        Upload
      </div>
      <div className="flex gap-1 flex-col mt-4 w-[100% ] text-[rgb(100,99,104)] ">
        <div
          className={`flex gap-4 items-center py-2 font-semibold cursor-pointer pl-8 rounded-r-full ${
            currentTab === 1
              ? "bg-[rgb(197,208,227)] text-[rgb(64,104,192)]"
              : null
          }`}
          onClick={() => {
            setCurrentTab(1);
            dispatch(clearRecent());
            navigate("/");
          }}
        >
          <FiHardDrive className="scale-[1.5]" />
          My Files
        </div>
        <div
          className={`flex gap-4 items-center py-2 font-semibold cursor-pointer pl-8 rounded-r-full ${
            currentTab === 2
              ? "bg-[rgb(197,208,227)] text-[rgb(64,104,192)]"
              : null
          }`}
          onClick={() => {
            setCurrentTab(2);
            dispatch(clearRecent());
            navigate("/shareWithMe");
          }}
        >
          <MdOutlineGroup className="scale-[1.5]" /> Shared With Me
        </div>
        <div
          className={`flex gap-4 items-center py-2 font-semibold cursor-pointer pl-8 rounded-r-full ${
            currentTab === 3
              ? "bg-[rgb(197,208,227)] text-[rgb(64,104,192)]"
              : null
          }`}
          onClick={() => {
            setCurrentTab(3);
            navigate("/recent");
          }}
        >
          <TbClock className="scale-[1.5]" />
          Recent
        </div>
      </div>
    </section>
  );
}

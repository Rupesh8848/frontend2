import React from "react";
import SearchBar from "./SearchBar";
import SliderSwitch from "./SliderSwitch";

export default function Navbar({ setUploadModalVisible }) {
  return (
    <nav className="flex border-b-[1px] py-4 px-4 justify-between sticky top-0 left-0 bg-white z-[5]">
      {/* <div
        onClick={() => setUploadModalVisible(true)}
        className="flex gap-1 border-[1px] items-center font-semibold text-[1.2rem] px-[10px] py-[5px] rounded-full  cursor-pointer shadow hover:bg-[rbg(94,95,107)]"
      >
        <FaPlus />
        Upload
      </div> */}
      <div className="flex items-center text-[1.5rem] bg-white z-2">Major</div>
      <SearchBar />
      <SliderSwitch />
    </nav>
  );
}

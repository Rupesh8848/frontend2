import React from "react";
import { RiCloseCircleLine } from "react-icons/ri";

export default function Modal(props) {
  return (
    <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)] z-50 h-[100svh] flex justify-center items-center">
      <div className="bg-white rounded-[20px] p-10 relative">
        <span
          className="absolute right-4 top-4 scale-[1.6] cursor-pointer"
          onClick={() => props.modalVisToggler(false)}
        >
          <RiCloseCircleLine />
        </span>
        <div>{props.children}</div>
      </div>
    </div>
  );
}

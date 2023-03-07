import React from "react";
// import { ClipLoader } from "react-spinners";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import "./Spinner.css";
export default function Spinner() {
  return (
    <div className="loader-overlay">
      <ClimbingBoxLoader
        color="#1d24e3"
        loading
        size={25}
        speedMultiplier={1}
      />
    </div>
  );
}

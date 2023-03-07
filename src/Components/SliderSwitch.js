import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSliderToPrivate, setSliderToPublic } from "../Slices/sliderSlice";
import { setUserData } from "../Slices/userDataSlice";
import "./SliderSwitch.css";
export default function SliderSwitch() {
  const { sliderState } = useSelector((state) => state.slider);
  const { data } = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  function handleChange() {
    dispatch(
      sliderState === "public" ? setSliderToPrivate() : setSliderToPublic()
    );
    console.log(sliderState);
  }
  return (
    <>
      <div className="slider-container flex gap-4">
        <label>Mode: </label>
        <label className="toggle">
          <input
            type="checkbox"
            checked={sliderState === "public" ? false : true}
            onChange={handleChange}
          />
          <span className="slider"></span>
          <span className="labels" data-on="Private" data-off="Public"></span>
        </label>
      </div>
    </>
  );
}

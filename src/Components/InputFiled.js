import React from "react";
import "./InputField.css";

export default function InputField({
  type,
  name,
  value,
  placeholder,
  changeHandler,
}) {
  return (
    <div className="input-with-placeholder">
      <input
        type={type}
        name={name}
        value={value}
        required
        className={`input`}
        onChange={changeHandler}
      />
      <p className="placeholder-text">{placeholder}</p>
    </div>
  );
}

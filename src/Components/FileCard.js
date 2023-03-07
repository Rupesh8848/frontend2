import React from "react";

export default function FileCard({ imgLink }) {
  return (
    <div>
      <div className="h-[250px] w-[250px] overflow-hidden">
        <img
          loading="lazy"
          src={imgLink}
          className="bg-transparent bg-no-repeat bg-center bg-cover"
        />
      </div>
    </div>
  );
}

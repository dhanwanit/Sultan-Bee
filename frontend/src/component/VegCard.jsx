//import { ChevronRightRounded } from "@mui/icons-material";
import React from "react";

function vegCard({ imgSrc, name, isActive }) {
  return (
    <div className={`rowVegCard ${isActive ? `active` : ``} d-flex flex-column align-items-center justify-content-around shadow-sm p-4 w-50 me-2 `}>
      <div className="vegimgBox d-flex justify-content-center align-items-center overflow-hidden rounded-circle mt-2">
        <img src={imgSrc} alt="" />
      </div>
      <h3>{name}</h3>
      {/* <i className="loadMenu">
        <ChevronRightRounded />
      </i> */}
    </div>
  );
}

export default vegCard;
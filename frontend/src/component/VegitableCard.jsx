import React, { useState } from "react";

import { useNavigate } from "react-router";
import Button2 from "./Button2"

const VegitableCard = ({ itemId, imgSrc, name, price }) => {
 

 

  return (
    <div
      className="vegitableCard d-flex align-items-center justify-content-between"
      id={itemId}
    >
      <div className="vegitableleft d-flex align-items-center me-5 pe-5">
        <div className="imgBox">
          <img src={imgSrc} />
        </div>
        <div className="d-flex flex-column">
          <h6>{name}</h6>
          <h6>{price}</h6>
        </div>
      </div>
      <div className="vegitableright">
       <Button2/>
      </div>
    </div>
  );
};

export default VegitableCard;

import { StarRounded } from "@mui/icons-material";
import React, { useState } from "react";


function HotelCard({ itemId, imgSrc, name, distance, ratings, subname, address }) {
  const [currentValue, setCurrentValue] = useState(Math.floor(ratings));

  const handleClick = (value) => {
    setCurrentValue(value);
  };


  return (
    <div className="hotelitemCard d-flex shadow align-items-center mt-3 p-1 ms-3 ms-xl-0" id={itemId}>
      <div className="imgBox me-1 ps-1">
        <img src={imgSrc} alt="" className="itemImg" />
      </div>

      <div className="hotelitemContent w-100 ps-2 me-3 text-black">
        <h3 className="itemName ">{name},  <i className='subname'>{subname}</i></h3>
        <h6 className="distance">{distance}</h6>
        <div className="bottom d-flex justify-content-between align-items-center">
          <div className="ratings">

            {Array.apply(null, { length: 1 }).map((e, i) => (
              <i
                key={i}
                className={`rating ${currentValue > i ? "orange" : "gray"}`}
                onClick={() => handleClick(i + 1)}
              >
                <StarRounded />
              </i>
            ))}
            <span>{ratings}</span>
            <h6 className='subname'>{address}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;

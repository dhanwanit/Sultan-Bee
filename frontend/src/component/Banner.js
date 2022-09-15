import React from "react";
import Carousel from "react-elastic-carousel";
import Steak from "../images/steak-house.png";
import Pizza from "../images/pizza.png";
// import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const Banner = () => {

  const breakPoints = [
    { width: 1, itemsToShow: 4 },
    { width: 550, itemsToShow: 4 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 6 },
  ];



  return (
    <div className="banner shadow overflow-hidden bg-white">
      <div className="main_banner mh-25">
        <div className="carousel">
          <div className='subcarousel pt-4 pb-2'>
            <h6 className='today text-center text-white'>Today</h6>
            <Carousel breakPoints={breakPoints}>
              <div className='item pt-2  m-1  w-100 text-center '>09:00 AM</div>
              <div className='item pt-2  m-1  w-100 text-center'>10:00 Am</div>
              <div className='item pt-2  m-1  w-100 text-center'>11:00 AM</div>
              <div className='item pt-2  m-1  w-100 text-center'>12:00 Am</div>
              <div className='item pt-2  m-1  w-100 text-center'>09:00 Am</div>
              <div className='item pt-2  m-1  w-100 text-center'>10:00 Am</div>
              <div className='item pt-2  m-1  w-100 text-center'>11:00 Am</div>
              <div className='item pt-2  m-1  w-100 text-center'>12:00 AM</div>
            </Carousel>
          </div>
        </div>
        {/* <ArrowForwardIos/> */}
      </div>

      <div className="menu_banner d-flex  justify-content-evenly my-3 ">
        <div className="menuCard " md={3}>
          <h6>All</h6>
        </div>

        <div className="imgMenu  d-flex justify-content-center align-items-center " md={3}>
          <img src={Steak} alt="" />
        </div>

        <div className="imgMenu  d-flex justify-content-center align-items-center " md={3}>
          <img src={Pizza} alt="" />
        </div>

        <div className="menuCard " md={3}>
          <div className="imgBox">
            <h6>Event</h6>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;

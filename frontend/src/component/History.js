import React from 'react'
import Lade from "../images/hamburg.jpg";
import sandwitch from "../images/sandwicth.jpg";
import { StarRounded } from "@mui/icons-material";
import BottomMenu from "./Header/BottomMenu";


const History = () => {
  return (
    <div className="mainHistory d-flex justify-content-around align-items-center flex-wrap">
      <div className="text-center history fw-bold">
        <p>History</p>
      </div>
      
      <div className="itemCard d-flex align-items-center my-3">
        <div className="imgBox me-1 ps-1">
          <img src={Lade} alt="" className="itemImg  " />
        </div>

        <div className="itemContent d-flex  justify-content-between flex-column w-100 ps-2 me-3">
          <div className="bottom d-flex justify-content-between align-items-center">
            <h3 className="itemName m-0">
              Burger Bistro{" "}
              <span>
                <StarRounded className="mx-1 star mt-0 " />
                4.2
              </span>
            </h3>
          </div>
          <p className="discription">
            Lorem ipsum dolor sit amet. Ut voluptatem enim eum ut.....
          </p>
          <div className="bottom">
            <h3 className="price">
              <span>$ </span>
              119{" "}
              <span className="text-decoration-line-through text-black text-muted">
                238
              </span>{" "}
              &nbsp; &nbsp;{" "}
              <span className="text-decoration-line-through me-5 ">
                50% off
              </span>
            </h3>
          </div>

        </div>
      </div>
      <div className="itemCard d-flex align-items-center my-3">
        <div className="imgBox me-1 ps-1">
          <img src={sandwitch} alt="" className="itemImg  " />
        </div>

        <div className="itemContent d-flex  justify-content-between flex-column w-100 ps-2 me-3">
          <div className="bottom d-flex justify-content-between align-items-center">
            <h3 className="itemName m-0">
              Burger Bistro{" "}
              <span>
                <StarRounded className="mx-1 star mt-0 " />
                4.2
              </span>
            </h3>
          </div>
          <p className="discription">
            Lorem ipsum dolor sit amet. Ut voluptatem enim eum ut.....
          </p>
          <div className="bottom">
            <h3 className="price">
              <span>$ </span>
              119{" "}
              <span className="text-decoration-line-through text-black text-muted">
                238
              </span>{" "}
              &nbsp; &nbsp;{" "}
              <span className="text-decoration-line-through me-5 ">
                50% off
              </span>
            </h3>
          </div>

        </div>
      </div>
      <div className="itemCard d-flex align-items-center my-3">
        <div className="imgBox me-1 ps-1">
          <img src={Lade} alt="" className="itemImg  " />
        </div>

        <div className="itemContent d-flex  justify-content-between flex-column w-100 ps-2 me-3">
          <div className="bottom d-flex justify-content-between align-items-center">
            <h3 className="itemName m-0">
              Burger Bistro{" "}
              <span>
                <StarRounded className="mx-1 star mt-0 " />
                4.2
              </span>
            </h3>
          </div>
          <p className="discription">
            Lorem ipsum dolor sit amet. Ut voluptatem enim eum ut.....
          </p>
          <div className="bottom">
            <h3 className="price">
              <span>$ </span>
              119{" "}
              <span className="text-decoration-line-through text-black text-muted">
                238
              </span>{" "}
              &nbsp; &nbsp;{" "}
              <span className="text-decoration-line-through me-5 ">
                50% off
              </span>
            </h3>
          </div>

        </div>
      </div>
      <BottomMenu />
    </div>
  )
}

export default History
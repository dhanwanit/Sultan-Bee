import React from "react";
import image from "../images/login.png";

const Loader = () => {
  return (
    <>
      <div className="d-grid align-items-center justify-content-center my-5">
        <img
          src={image}
          alt="loader"
          className="Loader_img img-fluid h-75 my-5"
        />
      </div>
    </>
  );
};

export default Loader;

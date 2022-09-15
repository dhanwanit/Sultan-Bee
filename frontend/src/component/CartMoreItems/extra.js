import React, { useState, useEffect } from "react";
// import Collapsible from "react-collapsible";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import redwine from "../../images/red-wine.png";
import rosewine from "../../images/rose-wine.png";
import whitewine from "../../images/white-wine.png";
import Button2 from "../Button2";
import { listExtraProduct } from "../../action/extraAction";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
const Extra = ({ item }) => {
  //    useEffect(()=>{
  //     dispatch(listExtraProduct(data._id))
  //        console.log(" extraproducts.............", extraproducts);

  //    },[])

  return (
    <> <Container>
      <div
        className="accordion_content d-flex align-items-center justify-content-between mb-3"
        id={item._id}
      >
         

        <div className="image_div">
          <img src={item.productImage} alt="redwine" className="w-100" />
        </div>
        <div className="accordion_detail mt-2">
          <p className="mb-0">{item.productName}</p>
          <p className="mb-0">${item.productPrice}</p>
        </div>
      
      </div>
      </Container>
    </>
  );
};

export default Extra;

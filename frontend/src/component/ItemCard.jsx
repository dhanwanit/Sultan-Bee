import { AddRounded,  StarRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {  useNavigate } from "react-router";
import {addToCart} from "../action/cartAction"
import {Link} from 'react-router-dom';
//import AddButtoncopy from "./AddButtoncopy";
import AddButton from "./AddButton";


// let cartItems = [];
// let cartData = [];
// let totaldata = [];

function ItemCard({product}) {

  console.log("products",product);
  
 
  const navigate = useNavigate();

  const dispatch = useDispatch()
  
  const [click, setClick] = useState(product);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const hanldeClick = (selectedRec) => {
    setSelectedData(selectedRec);
    setShow(true);
  };


  const hideModal = () => {
    setShow(false);
  };
   

  useEffect(() => {
    // const toggleIcon = document.querySelector(".addToCart");
    // toggleIcon.addEventListener("click", () => {
    //   document.querySelector(".rightmenu").classList.toggle("active");
    // });

  

   
  }, []);

  
  
  // const [{}, dispatch] = useStateValue();
  // const [isCart, setCart] = useState(null);
  

  // const [{ cart, total }] = useStateValue();

  // useEffect(() => {
  //   cartItems = cart;
  //   if (isCart) {
  //     cartData.push(isCart);
  //     dispatch({
  //       type: actionType.SET_CART,
  //       cart: cartData,
  //     });
  //   }
   
  // }, [isCart]);

  //console.log("cart ki quntity", cartData.length);

 
  
  return (

    <div className="itemCardDiv">
      
      {/* {test && test.map((data)=>( */}

     
    <div className="itemCard d-flex " key={product._id} id={product._id} >
    <div className="imgBox me-1 ps-1">
      <img src={product.product_image} alt="" className="itemImg  " />
    </div>

    <div className="itemContent d-flex  justify-content-between flex-column w-100 ps-2 me-3">
      <div className="bottom d-flex justify-content-between align-items-center">
        <h3 className="itemName m-0" id="toggleItem">
          {product.product_name}{" "}
          <span>
            <StarRounded className="mx-1 star mt-0 " />
           {product.product_rating}
          </span>
        </h3>
      </div>
      <p className="discription">{product.product_description}</p>
      <div className="bottom">
        <h3 className="price">
          <span>$ </span>
          {product.product_price}{" "}
          <span className="text-decoration-line-through text-black text-muted">
          {product.product_strike_price}
          </span>{" "}
          &nbsp; &nbsp;{" "}
          <span className="text-decoration-line-through me-5 ">{product.product_offer}% off</span>
        </h3>
      </div>
      {/* <Link to='/cart'> */}

     
      <AddButton  data={[product]}  />
               
     
    

      {/* </Link> */}
    </div>
 </div>

      {/* ))}
       */}

     
      </div> );
}

export default ItemCard;


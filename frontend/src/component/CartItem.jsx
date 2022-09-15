import { AddRounded, RemoveRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { actionType } from "./Reducer";
import { useStateValue } from "./StateProvider";
import { useParams,useLocation,useSearchParams } from 'react-router-dom';
import {  StarRounded } from "@mui/icons-material";
import { useSelector,useDispatch } from 'react-redux';
import {addQuantity ,subQuantity}from "../action/cartAction"

//let cartItems = [];
let totalData =[]; 

function CartItem({ item }) {
  const cart = useSelector((state)=>state.cart)
  const {cartItems} = cart
  console.log("cartitems.............",cartItems);
  const dispatch =useDispatch()
  
  const { id } = useParams();
  const { search } = useLocation();
  const [searchParms] = useSearchParams();
 // const productId = id;
  
  // const qty1 = search ? Number(search.split("=")[1]) : 1
  // console.log("qty1............",qty1);
 // console.log("productID",{ productId, qty, qtyParam: Number(searchParms.get("qty")) });
 //  const [qty, setQty] = useState(qty1);
 const [price, setprice] = useState(1);
  // const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseFloat(price));
  const [totalPrice, setTotalPrice] = useState(0);
  

  // useEffect(() => {
   
  //   setItemPrice(parseInt(qty) * parseFloat(price));
  //   if(itemPrice)
  //   { 
  //     totalData.push(itemPrice) 
  //     dispatch({
  //       type:actionType.SET_TOTAL,
  //       total:totalData.reduce((acc,items,index)=> acc+items ,0),
  //     }) 
  //   }  
    
  //   }, [qty ,price]);  
  
  // console.log("totalPrice", totalPrice);
  
  // const updateQty = (action, id) => {
   
  //   if (action == "add") {
  //     setQty(qty + 1);
  //    } 
     
  //    else {
  //     // initial state value is one so you need to check if 1 then remove it
  //     if (qty == 1) {
  //       cartItems.pop(id);
  //       dispatch({
  //         type: actionType.SET_CART,
  //         cart: cartItems,
  //       });
  //     } else {
  //       setQty(qty - 1);
      
  //       console.log(qty);
         
  //      }
   
  //   }

    


  // };


  // const updateqty = (action ,id) =>{
  //   if(action == "remove")
  //   {
  //     setQty(qty - 1);
  // totalData.shift(id)
  //     dispatch({
  //       type:actionType.SET_TOTAL,
  //       total:totalData.reduce((acc,items,index)=> acc+items ,0),
  //     })
  //   }
    
    
  // }


  return (
    <div className="itemCard d-flex align-items-center my-3 mx-xl-5 px-xl-5  " key={item._id}>
              <div className="imgBox me-1 ps-1">
                <img src={item.product_image} alt="" className="itemImg  " />
              </div>

              <div className="itemContent d-flex  justify-content-between flex-column w-100 ps-2 me-3">
                <div className="bottom d-flex justify-content-between align-items-center">
                  <h3 className="itemName m-0">
                  {item.product_name}{" "}
                    <span>
                      <StarRounded className="mx-1 star mt-0 " />
                      {item.product_rating}
                    </span>
                  </h3>
                </div>
                <p className="discription">
                {item.product_description}
                </p>
                <div className="bottom">
                  <h3 className="price">
                    <span>$ </span>
                    {item.product_price * item.qty}{" "}
                    <span className="text-decoration-line-through text-black text-muted">
                    {item.product_strike_price *item.qty}
                    </span>{" "}
                    &nbsp; &nbsp;{" "}
                    <span className="text-decoration-line-through me-5 ">
                    {item.product_offer}% off
                    </span>
                  </h3>
                </div>
                {/* <Link to='/cart'> */}

                <div className="cartItem" id={item._id}>
          <div className="itemSection    ">
            <div className="itemQuantity ">
              <div className="quantity d-flex align-items-center justify-content-between w-25">
                <RemoveRounded
                  className="itemRemove mt-0 mb-2 fs-6 "
                  onClick={() => dispatch(subQuantity(item._id))}
                />
                <h6 className=" bg-orange text-white p-1 me-3 ms-1 mt-0">
                  {item.qty}
                </h6>
                <AddRounded
                  className="itemAdd fs-6  me-5  "
                  onClick={() => dispatch(addQuantity(item._id))}
                />
              </div>
            </div>
          </div>
        </div>

                {/* </Link> */}
              </div>
            </div>
    
  );
} 
 
export default CartItem;

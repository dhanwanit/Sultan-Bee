import React, { useEffect, useState } from 'react'
import { AddRounded, RemoveRounded } from "@mui/icons-material";
import { actionType } from "./Reducer";
import { useStateValue } from "./StateProvider";



let cartItems = [];
let cartData = [];
const Button = ({ itemId, imgSrc, name, price }) => {

    const [qty, setQty] = useState(1);
   
  const [{}, dispatch] = useStateValue();
  const [isCart, setCart] = useState(null);
  const [{ cart, total }] = useStateValue();
     
    useEffect(() => {
        cartItems = cart;
        if (isCart) {
          cartData.push(isCart);
          dispatch({
            type: actionType.SET_CART,
            cart: cartData,
          });
        }
      }, [isCart]);
    

    const updateQty = (action, id) => {
        if (action == "add") {
          setQty(qty + 1);
        } else {
          // initial state value is one so you need to check if 1 then remove it
          if (qty == 1) {
            cartItems.pop(id);
            dispatch({
              type: actionType.SET_CART,
              cart: cartItems,
            });
          } else {
            setQty(qty - 1);
    
            console.log(qty);
          }
        }
      };

  return (
    <div>
        <div className="cartItem" id={itemId}>
          <div className="itemSection    ">
            <div className="itemQuantity ">
              <div className="quantity d-flex align-items-center justify-content-between w-25">
                <RemoveRounded
                  className="itemRemove mt-0 mb-2 fs-6 "
                  onClick={() => updateQty("remove", itemId)}
                />
                <h6 className=" bg-orange text-white p-1 me-3 ms-1 mt-0">
                  {qty}
                </h6>
                <AddRounded
                  className="itemAdd fs-6  me-5  "
                  onClick={() => updateQty("add", itemId)}
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Button

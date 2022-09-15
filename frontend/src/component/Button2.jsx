import React, {  useState } from 'react'
import { AddRounded, RemoveRounded } from "@mui/icons-material";
 import {addExtraToCart }from "../action/cartAction"
import {useDispatch,useSelector} from "react-redux";

const Button2 = ({ itemId }) => {
  const dispatch =useDispatch()
    const [qty, setQty] = useState(0);
   
    const cart = useSelector((state)=>state.cart)
  const {cartExtraItems} = cart
  console.log("cartExtraItems.............",cartExtraItems);

    const updateQty = (action, id) => {
        if (action == "add") {
          setQty(qty + 1);
        } else {
          // initial state value is one so you need to check if 1 then remove it
          if (qty == 1) {
           
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
                  onClick={() => {updateQty("add", itemId);dispatch(addExtraToCart(itemId))}}
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Button2

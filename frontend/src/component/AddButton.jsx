import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { AddRounded, RemoveRounded } from "@mui/icons-material";
import CartItem from "./CartItem";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { addToCart, addQuantity, subQuantity ,deleteItem} from "../action/cartAction";
import { listProductDetails } from "../action/adminAction";

const AddButton = ({ data }) => {
  console.log("dataid value", { data });

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const qty1 = cartItems.map((item) => item.qty);
  console.log("cartItems.............", cartItems);

  const [showSecondFields, setShowSecondFields] = useState(true);

  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});

  const hanldeClick = (selectedRec) => {
    // setSelectedData(selectedRec);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const isCart = (id) => {
    let data = cartItems.find((item) => id === item._id);
    if (data) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {data &&
        data.map((item) => {
          item.qty = 1;
       
          return (
            <div key={item._id}>
              {  
                 isCart(item._id) ? (
                <div className="cartItem" id={item._id}>
                  <div className="itemSection    ">
                    <div className="itemQuantity ">
                      <div className="quantity d-flex align-items-center justify-content-between w-25">
                        <RemoveRounded
                          className="itemRemove mt-0 mb-2 fs-6 "
                          onClick={() => {
                            // dispatch(subQuantity(item._id));

                            if (qty1  > 1) {
                              dispatch(subQuantity(item._id));
                            } else {
                              
                             dispatch(deleteItem( item._id));
                             setShow(false)
                              console.log("error");
                            }
                          }}
                        />
                        <h6 className=" bg-orange text-white p-1 me-3 ms-1 mt-0">
                          {qty1}
                        </h6>
                        <AddRounded
                          className="itemAdd fs-6  me-5  "
                          onClick={() => {
                            dispatch(addQuantity(item._id));
                            setShow(true)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="addToCart bg-transparent  d-flex justify-content-center align-items-center fw-bold shadow">
                  Add
                  <AddRounded
                    onClick={() => {
                      dispatch(addToCart(item._id));
                      hanldeClick(item._id);
                    }}
                  />
                </div>
              )}
              {show && (
                <Modal
                  details={item._id}
                  handleClose={hideModal}
                  item={item}
                  qty1={qty1}
                />
              )}
            </div>
          );
        })
      }
    </div>
  );
};

const Modal = ({ handleClose, details, item, qty1 }) => {
  console.log("item from addbutton", item._id);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addToCartHandler = () => {
    navigate(`/cart/${item._id}`);
  };
  return (
    <div className="modal display-block d-block top-0 start-0 w-100 h-100 ">
      <section className="modal-main position-fixed h-auto translate-middle w-75 start-50 ">
        <div className="mx-3 mt-2 text-white">
          <h6 className="mb-1">Item : {qty1}</h6>
          <h6>Price : {qty1 * item.product_price}$</h6>
        </div>
        <div className="cross position-absolute top-0 end-0 d-flex flex-column me-3">
          {/* <CancelRoundedIcon onClick={handleClose} className="cancel position-absolute" /> */}
          <button
            className="text-white my-3 bg-transparent border-0 fw-bold "
            onClick={addToCartHandler}
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
};
export default AddButton;

// import React, { useEffect, useState } from "react";
// import { useStateValue } from "./StateProvider";
// import { AddRounded, RemoveRounded } from "@mui/icons-material";
// import CartItem from "./CartItem";
// import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
// import { useNavigate } from "react-router-dom";
// import {useDispatch,useSelector} from "react-redux";

// import { useParams } from 'react-router-dom';
// import {addToCart,addQuantity ,subQuantity}from "../action/cartAction"
// import {listProductDetails }from "../action/adminAction"
// let cartdata =[];
// const AddButton = ({data}) => {
//   console.log("data...",data);
//   const [dataList, setDataList] = useState([]);
//   useEffect(()=>{setDataList(data)},[])
//   const dispatch =useDispatch()

//   const cart = useSelector((state)=>state.cart)
//   const {cartItems} = cart
//   console.log("cartItemsqty.............",cartItems.qty);
//    const qty1 = cartItems.qty
//   // console.log("qty1.............",qty1);
//   const productDetail = useSelector((state)=>state.productDetail)
//   const {product} = productDetail
//   console.log("product.............",product);
//   const [qty, setQty] = useState(qty1);

//   const [showSecondFields, setShowSecondFields] = useState(true);

//   const [show, setShow] = useState(false);
//   const [selectedData, setSelectedData] = useState({});

//   const updateQty = (action, id) => {
//     if (action == "add") {
//       setQty(qty + 1);

//     } else {
//       // initial state value is one so you need to check if 1 then remove it
//       if (qty == 1) {
//         setShow(false);
//         setShowSecondFields(true);

//       } else {
//         setQty(qty - 1);

//         console.log(qty);
//       }
//     }
//   };

//   const hanldeClick = (selectedRec) => {
//     setSelectedData(selectedRec);
//     setShow(true);
//   };

//   const hideModal = () => {
//     setShow(false);
//   };

//   return (
//     <div>
//       {showSecondFields ? (
//         <div
//           className="addToCart bg-transparent  d-flex justify-content-center align-items-center fw-bold shadow"
//           onClick={() => {
//             // setCart(Items.find((n) => n.id === itemId));
//             hanldeClick(data._id);
//             setShowSecondFields(false);
//             // setCart(Items.find((n) => n.id === itemId))
//             // navigate("/cart")
//           }}
//         >
//           Add
//           <AddRounded  onClick={()=>{dispatch(addToCart(data._id,qty))}}/>
//         </div>
//       ) : (
//         <div className="cartItem" id={data._id}>
//           <div className="itemSection    ">
//             <div className="itemQuantity ">
//               <div className="quantity d-flex align-items-center justify-content-between w-25">
//                 <RemoveRounded
//                   className="itemRemove mt-0 mb-2 fs-6 "
//                   onClick={() => {dispatch(subQuantity( data._id))}}
//                 />
//                 <h6 className=" bg-orange text-white p-1 me-3 ms-1 mt-0">
//                   {qty}
//                 </h6>
//                 <AddRounded
//                   className="itemAdd fs-6  me-5  "
//                   onClick={() =>{dispatch(addQuantity( data._id))}}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {show && <Modal details={selectedData} handleClose={hideModal} data={data} qty={qty} />}
//     </div>
//   );
// };

// const Modal = ({ handleClose, details,data ,qty}) => {

//   const dispatch =useDispatch()

//   const navigate = useNavigate();

//   const addToCartHandler = ()=>{

//       navigate(`/cart/?qty=${qty}` );

//   }
//   return (
//     <div className="modal display-block d-block top-0 start-0 w-100 h-100 ">
//       <section className="modal-main position-fixed h-auto translate-middle w-75 start-50 ">
//         <div className="mx-3 mt-2 text-white">
//           <h6 className="mb-1">Item : {qty}</h6>
//           <h6>Price : {qty * data.product_price}$</h6>
//         </div>
//         <div className="cross position-absolute top-0 end-0 d-flex flex-column me-3">
//           {/* <CancelRoundedIcon onClick={handleClose} className="cancel position-absolute" /> */}
//           <button
//             className="text-white my-3 bg-transparent border-0 fw-bold "
//             onClick={addToCartHandler}

//           >
//             Next
//           </button>
//         </div>
//       </section>
//     </div>
//   );
// };
// export default AddButton;

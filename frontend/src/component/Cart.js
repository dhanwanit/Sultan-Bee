import React, { useState, useEffect } from "react";
import { KeyboardArrowLeftOutlined, StarRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { listExtraCat } from "../action/extraAction";
import Lade from "../images/hamburg.jpg";
import Collapsible from "react-collapsible";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { listExtraProduct } from "../action/extraAction";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Button2 from "./Button2";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems ,cartExtraItems} = cart;
  console.log("cartExtraItems.............", cartExtraItems);
  const extraCat = useSelector((state) => state.extraCat);
  const { extracats } = extraCat;
  console.log("extraCatitems.............", extracats);
  const extraPro = useSelector((state) => state.extraPro);
  const { extraproducts } = extraPro;
  const [text, setText] = useState(false);
  const [catId, setCatId] = useState(localStorage.getItem("catid"));

  useEffect(() => {
    // cartItems = cart;
    // if (isCart) {
    //   cartData.push(isCart);
    //   dispatch({
    //     type: actionType.SET_CART,
    //     cart: cartData,
    //   });
    // }
    dispatch(listExtraCat());
  }, []);

  const setData = (id) => {
    setCatId(localStorage.setItem("catid", id));

    dispatch(listExtraProduct(id));
    console.log(" extraproducts.............", extraproducts);
  };
  // const setIds = (id)=>{
  //     dispatch(listExtraProduct(id));

  // }

  return (
    <>
      <div className="position-relative mb-5 pb-3">
        <div className="ladeheader text-white w-100 d-flex fw-bold  ">
          <div className="mt-1">
            {" "}
            <KeyboardArrowLeftOutlined onClick={() => navigate(-1)} />
          </div>
          <div className="ladekitchen mt-3 w-75 text-center ps-5 ms-xl-5 ">
            <p>Cart</p>
          </div>
        </div>

        <div className="mx-xl-5 px-xl-5">
          <Container>
            <div>
              {cartItems&&
                cartItems.map((item) => (
                  <div key={item._id}>
                    <CartItem item={item} />
                  </div>
                 
                ))}
                   </div>
        {/* {cartExtraItems && cartExtraItems.map((item)=>(  <div key={item._id}> {item._id ?<Extra item={item}/> :console.log("null")}</div>))} */}
                 
              <div>
                <div className="extraItem mx-xl-5 px-xl-5">
                  {extracats &&
                    extracats.map((data) => (
                      <div className="accordion position-relative my-3 my-xl-4 mx-3 py-2" key={data._id}>
                        {text == true ? (
                          <p className="text_true position-absolute text-dark fw-bold start-0">
                            {data.categoryName}
                          </p>
                        ) : (
                          <p className="text_false position-absolute">
                            {data.categoryName}
                          </p>
                        )}

                        <Collapsible
                          trigger={
                            <BiChevronDown
                              onClick={() => {
                                setText(true);
                                setData(data._id);
                              }}
                              className="openArrow"
                            />
                          }
                          triggerWhenOpen={
                            <BiChevronUp
                              onClick={() => {
                                setText(false);
                              }}
                              style={{ color: "rgb(243, 142, 10)" }}
                              className="openArrow"
                            />
                          }
                        >
                          {extraproducts.map((item) => (
                            <div key={item._id}>
                              {/* <Extra item={item} /> */}
                              <div
                                className="accordion_content d-flex align-items-center justify-content-between mb-3"
                                id={item._id}
                              >   
                                <div className="image_div">
                                  <img src={item.productImage} alt="redwine" />
                                </div>
                                <div className="accordion_detail mt-2">
                                  <p className="mb-0">{item.productName}</p>
                                  <p className="mb-0">${item.productPrice}</p>
                                </div>
                                <Button2 itemId={item._id} />
                              </div>
                            </div>
                          ))}
                        </Collapsible>
                      </div>
                    ))}
                </div>
              </div>
              <button
                variant="primary"
                type="submit"
                className="checkOut checkout_btn text-center position-fixed fw-bold bottom-0 border-0 text-white translate-middle start-50"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
           
          </Container>
        </div>
      </div>
    </>
  );
};

export default Cart;

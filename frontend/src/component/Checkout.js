import React, { useEffect, useState } from "react";
import { KeyboardArrowLeftOutlined, StarRounded } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Collapsible from "react-collapsible";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

import swal from "sweetalert";
import FormContainer from "./FormContainer";
import { Container } from "react-bootstrap";
//import Button1 from "./Button"
import Extra from "./CartMoreItems/extra";
import { createOrder } from "../action/orderAction";
import { savePaymentMethod, saveShippingAddress } from "../action/cartAction";
import { useSelector, useDispatch } from "react-redux";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [text, setText] = useState(false);
  //const [showSecondFields, setShowSecondFields] = useState(true);
  const cart = useSelector((state) => state.cart);
  const { cartExtraItems, cartItems, shippingAddress } = cart;

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [paymentMethod, setPaymentMethod] = useState("Card");
  console.log("address", address);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
  };

  const submitShiipingHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
  };

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  console.log("order", orderCreate);
  console.log("cart", cart);
  const addDecimal = (num) => {
    return Math.round((num * (100 / 100)).toFixed(2));
  };

  cart.itemsPrice = addDecimal(
    cart.cartItems
      .reduce((acc, item) => acc + item.product_price * item.qty, 0)
      .toFixed(2)
  );
  cart.shippingPrice = addDecimal(cart.itemsPrice > 500 ? 0 : 10);
  cart.taxPrice = addDecimal(Number((0.03 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);
  cart.paymentMethod = paymentMethod;
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };


console.log(" orderItems: cart.cartItems", {orderItems: cart.cartItems});
  

  // const orderConfirm = () => {
  //   const el = document.createElement("div");
  //   el.innerHTML = "<a href='http://google.com'>View invoice</a>";
  //   swal({
  //     title: "Order Confirmed",
  //     text: "Your product will get to you soon.",
  //     content: el,
  //     icon: "success",
  //   }).then(() => {
  //     navigate("/history");
  //   });

  // };

  useEffect(() => {
    console.log("cart", cart.cartItems);
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [success, navigate]);

  return (
    <>
      <div className="main_div position-relative">
        <div className="ladeheader text-white w-100 d-flex fw-bold  ">
          <div className="mt-1">
            <KeyboardArrowLeftOutlined onClick={() => navigate(-1)} />
          </div>
          <div className="ladekitchen mt-3 w-75 text-center ps-5 ms-xl-5">
            <p>CheckOut</p>
          </div>
        </div>

        <div className="mx-xl-5 px-xl-5">
          <Container>
            <div className="items_of_cart mx-xl-5 px-xl-5">
              <p className="fw-bold mt-3 ms-3 mb-0 text-capitalize">
                Items in cart
              </p>
              {cartItems &&
                cartItems.map((data) => (
                  <div className="item_list" key={data._id}>
                    <div className="itemCard d-flex align-items-center my-3">
                      <div className="imgBox me-1 ps-1">
                        <img
                          src={data.product_image}
                          alt=""
                          className="itemImg  "
                        />
                      </div>

                      <div className="itemContent d-flex  justify-content-between flex-column w-100 ps-2 me-3">
                        <div className="bottom d-flex justify-content-between align-items-center">
                          <h3 className="itemName m-0">
                            {data.product_name}{" "}
                            <span>
                              <StarRounded className="mx-1 star mt-0 " />
                              {data.product_rating}
                            </span>
                          </h3>
                        </div>
                        <p className="discription">
                          {data.product_description}
                        </p>
                        <div className="bottom">
                          <h3 className="price">
                            <span>{data.qty * data.product_price}$ </span>{" "}
                            <span className="text-decoration-line-through text-black text-muted">
                              {data.qty * data.product_strike_price}
                            </span>{" "}
                            &nbsp; &nbsp;{" "}
                            <span className="text-decoration-line-through me-5 ">
                              {data.product_offer}% off
                            </span>
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <Container>
              {cartExtraItems &&
                cartExtraItems.map((data) => (
                  <div
                    className="accordion_content d-flex align-items-center justify-content-between mb-3"
                    id={data._id}
                    key={data._id}
                  >
                    <div className="image_div">
                      <img
                        src={data.productImage}
                        alt="redwine"
                        className="w-100"
                      />
                    </div>
                    <div className="accordion_detail mt-2">
                      <p className="mb-0">{data.productName}</p>
                      <p className="mb-0">${data.productPrice}</p>
                    </div>
                  </div>
                ))}
            </Container>

            <div className="delivery_option mx-xl-5 px-xl-5">
              <p className="fw-bold mt-3 mx-3 mb-2">Delivery Options</p>
              <div className="option_list ms-3 fw-bold position-relative">
                Eat In
                <input
                  type="radio"
                  value="Eat In"
                  name="options"
                  className="my-1 position-absolute end-0"
                />
                <br />
                Eat In With Self Service
                <input
                  type="radio"
                  value="Self Service"
                  name="options"
                  className="my-1 position-absolute end-0"
                />
                <br />
                Packed for Home Delivery
                <input
                  type="radio"
                  value="Home delivery"
                  name="options"
                  className="my-1 position-absolute end-0"
                />
                <br />
              </div>

              <div className="option_accordion">
                {text == true ? (
                  <p className="text_true fw-bold mt-3 mx-3 mb-2">
                    Home Delivery
                  </p>
                ) : (
                  <p className="text_false fw-bold mt-3 mx-3 mb-2">
                    Home Delivery
                  </p>
                )}
                <Collapsible
                  trigger={
                    <BiChevronDown
                      onClick={() => setText(true)}
                      className="position-absolute end-0"
                    />
                  }
                  triggerWhenOpen={
                    <BiChevronUp
                      onClick={() => setText(false)}
                      style={{ color: "rgb(243, 142, 10)" }}
                      className="arrow_up position-absolute end-0"
                    />
                  }
                  className="position-relative"
                >
                  <FormContainer>
                    <Form onSubmit={submitShiipingHandler}>
                      <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Address"
                          required
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="City">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter city"
                          required
                          name="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="postalCode">
                        <Form.Label>PostalCode</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter PostalCode"
                          required
                          name="postalCode"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter country"
                          required
                          name="country"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Continue
                      </Button>
                    </Form>
                  </FormContainer>
                </Collapsible>
              </div>
              <form onSelect={submitHandler}>
                <div className="payment_option">
                  <p className="fw-bold mt-3 mx-3 mb-2">Pay Option</p>
                  <div className="option_list ms-3 position-relative">
                    Cash{" "}
                    <input
                      type="radio"
                      value="Cash"
                      id="Cash"
                      name="paymentMethod"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="position-absolute end-0"
                    />
                    <br />
                    Card{" "}
                    <input
                      type="radio"
                      value="Card"
                      id="Card"
                      name="paymentMethod"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="position-absolute end-0"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="order_details ms-3 mt-1 mb-5 mx-xl-5 px-xl-5">
              <p className="mb-0 mx-xl-3">
                Delivery in :{" "}
                <span className="fw-bold text-dark">20-40min</span>
              </p>
              <p className="mb-0 mx-xl-3">
                Delivery Fee :
                <span className="fw-bold text-dark">
                  {" "}
                  ${cart.shippingPrice}
                </span>{" "}
                &nbsp; &nbsp;Tax :
                <span className="fw-bold text-dark"> ${cart.taxPrice}</span>
              </p>
              {/* <p className="mb-0 mx-xl-3">
                
              </p> */}
              <p className="mb-0 mx-xl-3">
                Average rating :<span className="fw-bold text-dark"> 4.2 </span>
                <Link to="#" className="ms-3 text-decoration-none">
                  See more
                </Link>
              </p>
            </div>

            <div className="total_amount position-fixed bottom-0 start-0 d-flex justify-content-between align-items-center">
              <div className="ms-3">
                <p className="fw-bold my-2 fs-5">${cart.totalPrice}</p>
                <p
                  className="fw-bold fs-5"
                  style={{ color: "rgb(243, 142, 10)" }}
                >
                  Grand Total
                </p>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="order_btn mb-3 me-3 mt-3 border-0 px-5 py-3 fw-bold"
                onClick={placeOrderHandler}
              >
                Order
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Checkout;

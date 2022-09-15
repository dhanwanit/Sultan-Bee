import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { vegItems, Items, Hotel, vegitable } from "./Data";
import ItemCard from "./ItemCard";
import VegitableCard from "./VegitableCard";
import VegCard from "./VegCard";
import "react-multi-carousel/lib/styles.css";
import hotellogo from "../images/ladde-kitchen-logo.png";
import { listProduct, singleHotelDetails } from "../action/adminAction";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { KeyboardArrowLeftOutlined, KeyboardArrowRightOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import hotelCurve from "../images/uighhhg.png";


const HotelFood = () => {
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const singleHotel = useSelector((state) => state.singleHotel);
  const { hotel } = singleHotel;
  const [isMainData, setMainData] = useState(
    Items.filter((element) => element.itemId == "buger01")
  );
  const [isVegData, setVegData] = useState(
    Hotel.filter((element) => element.itemId == "burger01")
  );
  const [hotelName, setHotelName] = useState();
  // const [hotelImage, setHotelImage] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // console.log("hotelfood me hotel detail==>", hotel.map((data)=>data.restaurant_name));


  useEffect(() => {
    dispatch(singleHotelDetails(id));
    const test_cat_id = window.localStorage.getItem("cat")
    const rest_id = window.localStorage.getItem("id")
    dispatch(listProduct(test_cat_id, rest_id));
    const toggleIcons = [...document.getElementsByClassName("itemName")];
    toggleIcons.map((toggleIcon) =>
      toggleIcon.addEventListener("click", () => {
        document.querySelector(".rightMenu").classList.toggle("active");
      })
    );

  }, []);

  useEffect(() => {
    for (let [key, value] of Object.entries(hotel)) {
      // console.log("hotel ki detail", { key: value });
      // console.log("hotel ki detail", value.restaurant_name);
      // console.log("hotel ki detail", value.restaurant_image);
      setHotelName(value.restaurant_name)
      // setHotelImage(value.restaurant_image)
    }
  }, [hotel])


  const setData = (itemId) => {
    setVegData(Hotel.filter((element) => element.itemId == itemId));
  };


  return (
    <div className="dummyMain">
      <div className="hotelDetails overflow-hidden">
        <div className="BackImage position-relative ">
          <div className="hotelmenu p-3 position-absolute top-0 start-0 end-0  text-center d-flex flex-column">
            <div className="hotelarrow text-start mb-2">
              <KeyboardArrowLeftOutlined onClick={() => navigate(-1)} />
            </div>

            <div className="rightVegMenuContainer d-flex align-items-center  p-1">
              <div className="rowVegMenuCard d-flex flex-column align-items-center justify-content-around shadow  w-50 me-2 mt-1">
                <h3 className=" me-1">Menu</h3>
              </div>

              <div className="shadow rowVegMenuCard d-flex flex-column align-items-center justify-content-around shadow  w-50 me-2 mt-1">
                <h3>Papolares</h3>
              </div>
              <div className="shadow rowVegMenuCard d-flex flex-column align-items-center justify-content-around shadow  w-50 me-2 mt-1">
                <h3>Todoterreno</h3>
              </div>
              <div className="shadow rowVegMenuCard d-flex flex-column align-items-center justify-content-around shadow  w-50 me-2 mt-1">
                <h3>Conduct</h3>
              </div>
            </div>
          </div>


          <div className="bottom-part d-flex flex-column position-absolute bottom-0 ">

            <div className="curvText d-flex flex-row">
              <div className="curv">
                <img
                  src={hotellogo}
                  alt="hotelLogo"
                  className="w-100 h-100 "
                />
              </div>
              <div className="text-white hotelName">
                <h5 className=" text-orange ">{hotelName}</h5>
                <div className="textarrow d-flex flex-row">
                  <p>See more information</p>
                  <KeyboardArrowRightOutlined className="rightaerrow" />
                </div>
              </div>
            </div>


            <div className="suvcurve w-100 postion-absolute bottom-0 ">
              <img src={hotelCurve} alt="hotelCurve " className="w-100  " />
            </div>

          </div>


        </div>
        <Container>
          <div className="hotelpara">
            <p>
              "{hotelName} Ea voluptate doloremque et repellendus ducimus et
              dolore amet quo sequi error non numquam quas non aliquid
              voluptate. Ut vitae dolor ab quis accusantium eum earum dolores et
              quibusdam quibusdam aut eius fugiat quo corrupti amet At illo
              eaque! Est error consequuntur eum sunt quam et velit enim. Est
              cumque tempora quo dicta nemo et inventore velit et nulla delectus
              ut enim veritatis aut molestiae maxime et laborum quaerat".
            </p>
          </div>
        </Container>
      </div>
      <div className="secondMainSection pb-5">
        <Container>
          <div className="dishItemContainer d-flex align-items-center flex-wrap">
            {products &&
              products.map((product) => (
                <ItemCard
                  product={product}
                  key={product._id}
                />
              ))}
          </div>
          <div className="viewStatic">
            <button
              className="checkOut text-center position-fixed fw-bold bottom-0 border-0  w-75 text-white translate-middle start-50"
              onClick={() => {
                navigate("/viewmore");
              }}
            >
              View More
            </button>
          </div>

          <div className="rightMenu  position-fixed  end-0  d-flex flex-column align-items-center shadow">
            <Container>
              <h6> Delivery Option</h6>
              <div className="vegContainer d-flex align-items-center my-2 p-2">
                {vegItems &&
                  vegItems.map((data) => (
                    <div key={data.id} onClick={() => setData(data.itemId)}>
                      <VegCard
                        imgSrc={data.imgSrc}
                        name={data.name}
                        isActive={data.id == "1" ? true : false}
                      />
                    </div>
                  ))}
              </div>

              <div className="rightSumMenu  position-fixed  end-0  d-flex flex-column align-items-center shadow">
                <Container>
                  <div className="rightVegMenuContainer d-flex align-items-center  p-1">
                    <div className="rowVegMenuCard d-flex flex-column align-items-center justify-content-around shadow-sm  w-50 me-2 mt-1">
                      <h3>Vegitable</h3>
                    </div>
                    <div className="rowVegMenuCard d-flex flex-column align-items-center justify-content-around shadow-sm  w-50 me-2 mt-1">
                      <h3>Meat</h3>
                    </div>
                    <div className="rowVegMenuCard d-flex flex-column align-items-center justify-content-around shadow-sm  w-50 me-2 mt-1">
                      <h3>Sauce</h3>
                    </div>
                    <div className="rowVegMenuCard d-flex flex-column align-items-center justify-content-around shadow-sm  w-50 me-2 mt-1">
                      <h3>Topper</h3>
                    </div>
                  </div>
                </Container>
                <div className="vegitableContainer ">
                  {vegitable &&
                    vegitable.map((data) => (
                      <VegitableCard
                        key={data.id}
                        itemId={data.id}
                        imgSrc={data.imgSrc}
                        name={data.name}
                        price={data.price}
                      />
                    ))}
                </div>

                <button
                  className="vegitableCheckOut text-center position-fixed fw-bold ms-3 border-0  w-75 text-white"
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  View More
                </button>
              </div>
            </Container>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HotelFood;

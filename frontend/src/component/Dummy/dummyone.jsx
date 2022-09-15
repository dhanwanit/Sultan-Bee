import React, { useEffect, useState } from "react";
import {  vegItems, Items, Hotel, vegitable } from "../Data";
import ItemCard from "../ItemCard";
import "../Dummy/dummy.css"
import { useStateValue } from "../StateProvider";
import VegitableCard from "../VegitableCard";
import VegCard from "../VegCard";
import "react-multi-carousel/lib/styles.css";
import hotellogo from "/home/ntf-310/Desktop/sultan-bee/src/images/ladde-kitchen-logo.png";

import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined,
} from "@mui/icons-material";

import hotelCurve from "/home/ntf-310/Desktop/sultan-bee/src/images/uighhhg.png"

const DummyOne = () => {
  useEffect(() => {
    const toggleIcons = [...document.getElementsByClassName("itemName")];
    toggleIcons.map((toggleIcon) =>
      toggleIcon.addEventListener("click", () => {
        document.querySelector(".rightMenu").classList.toggle("active");
      })
    );
  }, []);

  const navigate = useNavigate();
  const [isMainData, setMainData] = useState(
    Items.filter((element) => element.itemId == "buger01")
  );

  const [isVegData, setVegData] = useState(
    Hotel.filter((element) => element.itemId == "burger01")
  );

  // const [{ cart, total }, dispatch] = useStateValue();

  // console.log("poonamvarsha", total);

  const setData = (itemId) => {
    setVegData(Hotel.filter((element) => element.itemId == itemId));
  };

  return (
    <div className="dummyMain">
      <div className="hotelDetails overflow-hidden">
        <div className="BackImageone position-relative ">
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
         
        
            
            <div className="curvTextone d-flex flex-row position-absolute">
            <div className="curvone   ">
            <img src={hotellogo} alt="hotelLogo " className="w-100 h-100 " /> 
            </div>
            <div className="text-white   hotelNameone ">
              <h5 className=" text-orange ">La'De Kitchen</h5>
              <div className="textarrow d-flex flex-row">
                <p>See more information</p>
                <KeyboardArrowRightOutlined className="rightaerrow" />
              </div>
            </div>
          
            </div>
         
          <div className="suvcurveone w-100 postion-absolute bottom-0 ">
            {" "}
             <img src={hotelCurve} alt="hotelCurve " className="w-100  " /> 
          </div>
            
            
        </div>
        <Container>
        <div className="hotelpara">
         
            <p>
              "La'De kitchen Ea voluptate doloremque et repellendus ducimus et
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
        <div className="dishItemContainer d-flex justify-content-around align-items-center flex-wrap">
          {isMainData &&
            isMainData.map((data) => (
              <ItemCard
                key={data.id}
                itemId={data.id}
                imgSrc={data.imgSrc}
                disc={data.disc}
                name={data.name}
                ratings={data.ratings}
                price={data.price}
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

export default DummyOne;

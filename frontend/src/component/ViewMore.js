import React, { useEffect, useState } from "react";
import { KeyboardArrowLeftOutlined} from "@mui/icons-material";
import { vegItems, Items, Hotel, vegitable } from "./Data";

import ItemCard from "./ItemCard";
import CartItem from "./CartItem";
import { useStateValue } from "./StateProvider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { actionType } from "./Reducer";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MenuCard from "./MenuCard";
import VegCard from "./VegCard";
import VegitableCard from "./VegitableCard";
import Filter from "../images/filter-icon.png";

const ViewMore = () => {
  useEffect(() => {
    const toggleIcons =[...document.getElementsByClassName("itemName")];
    toggleIcons.map(toggleIcon=> toggleIcon.addEventListener("click", () => {
      document.querySelector(".rightMenu").classList.toggle("active");
     
    }))
  
    
   
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
    <>
      {/* Header section */}
      {/* <Header /> */}
      <div className="main position-relative">
        <div className="hoteldetails">
          <div className="ladeheader text-white w-100 d-flex fw-bold  ">
            <div className="mt-1">
              {" "}
              <KeyboardArrowLeftOutlined onClick={() => navigate(-1)} />
            </div>
            <div className="ladekitchen  mt-3 w-75 text-center  ps-5">
              <p>La'De Kitchen</p>
            </div>
          </div>
          <div className="hotelmenu p-3 position-absolute  start-0 end-0 d-block text-center">
            {/*       
   <div className='hotelarrow text-start mb-2'>
  
   </div> */}

            <div className="rightVegMenuContainer d-flex align-items-center  p-1">
              <div className="shadow-sm rowVegMenuCard d-flex flex-column align-items-center justify-content-around   w-50 me-2 mt-1">
                <div className="d-flex align-items-center ms-2">
                  <img src={Filter} alt="" className="w-25 me-1 pe-1" />
                  <h3 className=" me-1">Filter</h3>
                </div>
              </div>
              <div className="shadow-sm rowVegMenuCard d-flex flex-column align-items-center justify-content-around   w-50 me-2 mt-1">
                <h3>Papolares</h3>
              </div>
              <div className="shadow-sm rowVegMenuCard d-flex flex-column align-items-center justify-content-around   w-50 me-2 mt-1">
                <h3>Todoterreno</h3>
              </div>
              <div className="shadow-sm rowVegMenuCard d-flex flex-column align-items-center justify-content-around   w-50 me-2 mt-1">
                <h3>Conduct</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="dishItemContainer d-flex justify-content-around align-items-center mt-5 pt-4 flex-wrap">
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
         

       
        <div className="rightMenu  position-fixed end-0  d-flex flex-column align-items-center shadow">
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
        
      </div>
    </>
  );
};

export default ViewMore;

import React, { useEffect, useState } from "react";
import { Hotel } from "./Data";
import MenuCard from "./MenuCard";
import ItemCard from "./MenuCard";
import HotelCard from "./HotelCard";
import Banner from "./Banner";
import { Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { listMenu, listHotel, listProduct } from "../action/adminAction";
import BottomMenu from "./Header/BottomMenu";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";


const HotelDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  const menuList = useSelector((state) => state.menuList);
  const { menus } = menuList;
  const hotelList = useSelector((state) => state.hotelList);
  const { hotels } = hotelList;
  // console.log("hotels ki details", hotels);
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  // console.log("products ki details", products);

  const [isMainData, setMainData] = useState();
  // Hotel.filter((element) => element.itemId == "buger01")

  const [cat, setCat] = useState();
  const [pro, setPro] = useState();

  useEffect(() => {
    // menu Card active class changer
    const menuCard = document
      .querySelector(".rowContainer")
      .querySelectorAll(".rowMenuCard");
    function setMenuCardActive() {
      menuCard.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }
    menuCard.forEach((n) => n.addEventListener("click", setMenuCardActive));
    //  dispatch(listProduct(params.cat,params.id));
    dispatch(listMenu());
  }, [dispatch]);


  const setData = async (cat_id) => {
    window.localStorage.setItem("cat", cat_id);
    setCat(cat_id);
    dispatch(listHotel(cat_id));
    // console.log("fetch_restaurant_by_categoryId", hotels);
  };


  const setProductData = async (rest_id) => {
    //setMainData(Hotel.filter((element) => element.itemId == itemId));
    const test_cat_id = window.localStorage.getItem("cat");
    dispatch(listProduct(test_cat_id, rest_id));
    // console.log("fetch_product_by_categoryAndRestId", products);
    setPro(products);
    window.localStorage.setItem("id", rest_id);
    navigate(`/hotelfood/${test_cat_id}/${rest_id}`);
  };

  // console.log("pro data value", pro);

  return (
    <>
      {/* Header section */}
      {/* <Header /> */}

      <div className="maincontainer position-relative ">
        <Banner />

        <Container>
          {/* menu card */}
          <div className="rowContainer d-flex align-items-center my-2 p-2">
            {menus &&
              menus.map((data) => (
                <div key={data._id} onClick={() => setData(data._id)}>
                  <MenuCard
                    data={data}
                    category_image={data.category_image}
                    category_name={data.category_name}
                    isActive={data._id == "1" ? true : false}
                  />
                </div>
              ))}
          </div>
          {/* {pro && pro.map((data)=>())} */}

          {/* <Link to="/hotelfood" className="linkclass" onClick={submit}> */}
          <div className="dishItemContainer d-flex  flex-wrap">
            {hotels &&
              hotels.map((data) => (
                <div key={data._id} onClick={() => setProductData(data._id)}>
                  <HotelCard
                    data={data}
                    key={data._id}
                    itemId={data._id}
                    imgSrc={data.restaurant_image}
                    name={data.restaurant_name}
                    subname={data.restaurant_subName}
                    address={data.address}
                    ratings={data.restaurant_rating}
                    distance={data.restaurant_distance}
                  />
                </div>
              ))}
          </div>

          {/* {pro && pro.map((data)=>(<ItemCard data={data}/>))} */}

          {/* </Link> */}
          <div className="map_btn_div">
            <Button
              variant="primary"
              type="submit"
              className="map_btn"
              onClick={() => navigate("/hotel-location")}
              fytuha
            >
              Map
            </Button>
          </div>

          <BottomMenu />
        </Container>
      </div>
    </>
  );
};

export default HotelDetail;

import React, { useEffect } from "react";
import MenuContainer from "../MenuContainer";
import {
  History,
  LocationOn,
  MoreVert,
  QrCodeScanner,
  Settings,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router";

const BottomMenu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const menuLi = document.querySelectorAll("#menu li");

    function setMenuActive() {
      menuLi.forEach((n) => n.classList.remove("active"));
      this.classList.add("active");
    }

    menuLi.forEach((n) => n.addEventListener("click", setMenuActive));

    const moreIcons = [...document.getElementsByClassName("moreVert")];
    moreIcons.map((toggleIcon) =>
      toggleIcon.addEventListener("click", () => {
        document.querySelector(".moreMenu").classList.toggle("active");
      })
    );
  }, []);

  const logout = () => {
    // localStorage.removeItem('userInfo');
    // localStorage.clear();
    // navigate('/login');
  }


  return (
    <>
      <div className="leftMenu position-fixed bottom-0 start-0 w-100 ">
        <ul id="menu" className="d-flex justify-content-around px-1 ">

          <div className='leftmenucompo'>
            <MenuContainer to='#' icon={<LocationOn onClick={() => navigate("/hotel")} />} text={"Home"} isHome />
          </div>

          <div className='leftmenucompo'>
            <MenuContainer to='#' icon={<Settings />} text={" Details"} />
          </div>

          <div className='leftmenucompo'>
            <MenuContainer to='#' icon={<QrCodeScanner onClick={() => navigate("/scan")} />} text={" Scan"} />
          </div>

          <div className='leftmenucompo'>
            <MenuContainer to='#' icon={<History onClick={() => navigate("/history")} />} text={"History"} />
          </div>

          <div className='leftmenucompo'>
            <MenuContainer to='#' icon={<MoreVert className="moreVert" />} text={"More"} />
          </div>

          {/*         
          <div className="indicator"></div> */}
        </ul>
      </div>

      <div className="moreMenu position-fixed end-0 d-flex flex-column align-items-center shadow">
        <Container>
          <div className="moreMenu_option d-flex flex-column">
            <h6>More</h6>
            <Link to={"/profile"}> Profile</Link>
            <Link to={"/setting"}> Setting</Link>
            <Link to={"/login"} onClick={logout}>Logout</Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default BottomMenu;

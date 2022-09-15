import React from "react";

function MenuContainer({ link, icon, isHome ,text }) {
  return (
    <li className={isHome ? `active` : `` }>
      <a href={link}>
        <span className="icon position-relative d-block  text-center">{icon}</span> 
        <h6 className='text'>{text}</h6>
      </a>
    </li>
  );
}

export default MenuContainer;
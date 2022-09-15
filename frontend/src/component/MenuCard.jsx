
import React from "react";

function MenuCard({ category_name,category_image ,isActive }) {

  return (
    <div className={`rowMenuCard ${ isActive ? `active` : ``} d-flex flex-column align-items-center justify-content-around shadow-sm p-4 w-50 me-2 `}>
      <div className="imgBox d-flex justify-content-center align-items-center overflow-hidden rounded-circle mt-2">
        
        <img src={category_image} alt="hj" />

     
        
      </div>
      <h3>{category_name}</h3>
      
    </div>
  );
}

export default MenuCard;
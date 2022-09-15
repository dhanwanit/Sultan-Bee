import React, { useEffect, useState } from "react";
import { AddRounded, RemoveRounded } from "@mui/icons-material";
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';


import { useNavigate } from "react-router-dom";

const AddButton = ({ itemId, imgSrc, name, price }) => {
  const [qty, setQty] = useState(1);

  // const [showSecondFields, setShowSecondFields] = useState(true);

  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const [dataList, setDataList] = useState([]);

  const fetchData = async(id) => {
    try {
        console.log(id);
        const config ={
            headers :{
                'Content-Type':'application/json',
             
                 } 
                
               }

      const { data }  = await axios.get(`http://192.168.1.30:8080/api/product/get_product_byId/${id}`,config)
      setDataList(data)
      console.log("api data",data);
      
    } catch (error) {
      
    }
     
  }

  console.log("datalist cart",dataList);

useEffect(() => {
  fetchData();
  }, [])
 
  const cart = useSelector((state) => state.cart)

  console.log("useselctor cart",cart);


  const dispatch = useDispatch();
  const isCart = (id) => {
    let data = cart.find(item => id === item._id);
    if (data) {
        return true;
    }
    else {
        return false;
    }
}
  

  // const updateQty = (action, id) => {
  //   if (action == "add") {
  //     setQty(qty + 1);
     
  //   } else {
  //     // initial state value is one so you need to check if 1 then remove it
  //     if (qty == 1) {
  //       setShow(false);
  //       setShowSecondFields(true);
        
  //     } else {
  //       setQty(qty - 1);

  //       console.log(qty);
  //     }
  //   }
  // };

 
  // const hanldeClick = (selectedRec) => {
  //   setSelectedData(selectedRec);
  //   setShow(true);
  // };

  // const hideModal = () => {
  //   setShow(false);
  // };

  return(
    <div>
    {dataList.map(item => {
                        item.qty = 1;
   

  return (
    <div>
      { isCart(item._id) ? (

<div className="cartItem" id={item._id}>
<div className="itemSection    ">
  <div className="itemQuantity ">
    <div className="quantity d-flex align-items-center justify-content-between w-25">
      
       <AddRounded
        className="itemAdd fs-6  me-5  "
        onClick={() => dispatch({ type: "INCREASE", payload: item })}
      />
      <h6 className=" bg-orange text-white p-1 me-3 ms-1 mt-0">
        {qty}
      </h6>
     <RemoveRounded
        className="itemRemove mt-0 mb-2 fs-6 "
        onClick={() => {
          if (item.qty > 1) {
              dispatch({ type: "DECREASE", payload: item });
          } else {
              dispatch({ type: "REMOVE", payload: item });
          }
      }}
      />
    </div>
  </div>
</div>
</div>
        
      )
      
      
      :
      
      
      
      (
        <div
          className="addToCart bg-transparent  d-flex justify-content-center align-items-center fw-bold shadow"
          onClick={() => dispatch({ type: "ADD", payload: item })} >
          Add
          <AddRounded />
        </div>
      )
      
      
      }
{/* 
      {show && <Modal details={selectedData} handleClose={hideModal} />} */}
    </div>
  );
})}</div>)
};

// const Modal = ({ handleClose, details }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="modal display-block d-block top-0 start-0 w-100 h-100 ">
//       <section className="modal-main position-fixed h-auto translate-middle w-75 start-50 ">
//         <div className="mx-3 mt-2 text-white">
//           <h6 className="mb-1">Item : 1</h6>
//           <h6>Price : 119$</h6>
//         </div>
//         <div className="cross position-absolute top-0 end-0 d-flex flex-column me-3">
//           {/* <CancelRoundedIcon onClick={handleClose} className="cancel position-absolute" /> */}
//           <button
//             className="text-white my-3 bg-transparent border-0 fw-bold "
//             onClick={() => {
//               navigate("/cart ");
//             }}
//           >
//             Next
//           </button>
//         </div>
//       </section>
//     </div>
//   );
  
// };

export default AddButton;

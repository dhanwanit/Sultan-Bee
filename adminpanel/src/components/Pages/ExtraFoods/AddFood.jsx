import React, { useState } from "react";
import "../NewProduct/newproduct.css";
import swal from 'sweetalert';
import Sidebar from '../../Sidebar/Sidebar'
import { useNavigate } from "react-router-dom";


const AddFood = () => {
  const [newFood, setNewFood] = useState({
    productName: '',
    productPrice: '',
  });
  const [productImage, setProductImage] = useState();

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setNewFood({ ...newFood, [name]: value })
  }

  const navigate = useNavigate();

  const newProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', newFood.productName);
    formData.append('productPrice', newFood.productPrice);
    formData.append('productImage', productImage);

    await fetch('http://localhost:8080/api/admin/insertproduct', {
      method: 'post',
      body: formData
    }).then(r => {
      console.log(r);
    });
    swal({
      title: "Product Added Successfully!",
      icon: "success"
    }).then(function () {
      navigate('/extrafoods')
    });
    setNewFood({
      productName: '',
      productPrice: '',
    })
    setProductImage('');
  };

  return (
    <>
      <Sidebar />
      <div className="newUser mt-4 ms-5">
        <h1 className="newUserTitle fw-bold ms-2">Add New Product</h1>
        <form
          onSubmit={newProductSubmit}
          encType="multipart/form-data"
          className="newUserForm d-flex flex-wrap"
        >
          <div className="newUserItem d-flex flex-column mt-3 me-5">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Item Name"
              name="productName"
              value={newFood.productName}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="newUserItem d-flex flex-column mt-3 me-5">
            <label>Product Price</label>
            <input
              type="number"
              placeholder="Price"
              name="productPrice"
              value={newFood.productPrice}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="newUserItem d-flex flex-column mt-3 me-5">
            <label htmlFor="file">Photo</label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="item_image"
              onChange={(e) => setProductImage(e.target.files[0])}
              required
            />
          </div>

          <button className="newUserButton">Create</button>
        </form>
      </div>
    </>

  )
}

export default AddFood
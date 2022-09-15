import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../EditProduct/editproduct.css";
import swal from 'sweetalert';
import Sidebar from '../../Sidebar/Sidebar'


const EditFoods = () => {
  const [UpdatedFood, setUpdatedFood] = useState({
    productName: '',
    productPrice: '',
  });
  const [productImage, setProductImage] = useState();

  const navigate = useNavigate();

  const { foodId } = useParams();

  useEffect(() => {
    getProductDetail();
  }, []);


  const getProductDetail = async () => {
    let result = await fetch(`http://localhost:8080/api/admin/getproduct_byId/${foodId}`);
    result = await result.json();
    console.log(result);
    setUpdatedFood({
      productName: result[0].productName,
      productPrice: result[0].productPrice,
    });
    setProductImage(result[0].productImage);
  }


  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdatedFood({ ...UpdatedFood, [name]: value })
  }


  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // console.log();
    formData.append('productName', UpdatedFood.productName);
    formData.append('productPrice', UpdatedFood.productPrice);
    formData.append('productImage', productImage);
    await fetch(`http://localhost:8080/api/admin/updateproduct/${foodId}`, {
      method: 'put',
      body: formData
    }).then(r => {
      console.log(r)
    });
    swal({ title: "Product Successfully Updated!", icon: "success" });
    navigate('/extrafoods');
  }

  return (
    <>
      <Sidebar />
      <div className="editProduct p-3">
        <h1 className="editProductTitle ms-2">Edit Product</h1>
        <form
          onSubmit={formSubmitHandler}
          className="editProductForm d-flex flex-wrap mt-2"
          encType="multipart/form-data">

          <div className="editProductItem d-flex flex-column mx-5 my-3">
            <label>Product Name</label>
            <input
              type="text"
              placeholder="Product Name"
              name="productName"
              value={UpdatedFood.productName}
              onChange={onChangeHandler}
            />
          </div>

        
          <div className="editProductItem d-flex flex-column mx-5 my-3">
            <label>Price</label>
            <input
              type="number"
              placeholder="Price"
              name="productPrice"
              value={UpdatedFood.productPrice}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editProductItem d-flex flex-column mx-5 my-3">
            <label htmlFor="inputGroupFile">Image</label>
            <input
              type="file"
              id='inputGroupFile'
              aria-describedby="inputGroupFileAddon"
              name="product_image"
              onChange={(e) => setProductImage(e.target.files[0])}

            />
          </div>
          <div className='editProductItem ms-4 mt-4'>
            <span className='fw-bold me-3'>Current Image :</span>
            <img src={productImage} alt='productImage' className='currentProductImage' />
          </div>
          
          <button className="editProductButton">Update</button>

        </form>
      </div>
    </>
  )
}

export default EditFoods
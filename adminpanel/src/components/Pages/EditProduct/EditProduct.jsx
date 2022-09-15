import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import "./editproduct.css";
import swal from 'sweetalert';
import Sidebar from '../../Sidebar/Sidebar'

const EditProduct = () => {
  const [UpdatedProduct, setUpdatedProduct] = useState({
    product_name: '',
    product_description: '',
    product_price: '',
    product_rating: '',
    product_strike_price: '',
    product_offer: '',
  });
  const [product_image, setProductImage] = useState();
  const navigate = useNavigate();

  const { productId } = useParams();

  useEffect(() => {
    getProductDetail();
  }, []);


  const getProductDetail = async () => {
    let result = await fetch(`http://localhost:8080/api/product/get_product_byId/${productId}`);
    result = await result.json();
    console.log(result);
    setUpdatedProduct({
      product_name: result[0].product_name,
      product_description: result[0].product_description,
      product_price: result[0].product_price,
      product_rating: result[0].product_rating,
      product_strike_price: result[0].product_strike_price,
      product_offer: result[0].product_offer,
    });
    setProductImage(result[0].product_image);
  }


  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdatedProduct({ ...UpdatedProduct, [name]: value })
  }


  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // console.log();
    formData.append('product_name', UpdatedProduct.product_name);
    formData.append('product_description', UpdatedProduct.product_description);
    formData.append('product_price', UpdatedProduct.product_price);
    formData.append('product_rating', UpdatedProduct.product_rating);
    formData.append('product_strike_price', UpdatedProduct.product_strike_price);
    formData.append('product_offer', UpdatedProduct.product_offer);
    formData.append('product_image', product_image);
    await fetch(`http://localhost:8080/api/product/update_product/${productId}`, {
      method: 'put',
      body: formData
    }).then(r => {
      console.log(r)
    });
    swal({ title: "Product Successfully Updated!", icon: "success" });
    navigate('/products');
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
              name="product_name"
              value={UpdatedProduct.product_name}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editProductItem d-flex flex-column mx-5 my-3">
            <label>Product Description</label>
            <input
              type="text"
              placeholder="Description"
              name="product_description"
              value={UpdatedProduct.product_description}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editProductItem d-flex flex-column mx-5 my-3">
            <label>Price</label>
            <input
              type="number"
              placeholder="Price"
              name="product_price"
              value={UpdatedProduct.product_price}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editProductItem d-flex flex-column mx-5 my-3">
            <label>Ratings</label>
            <input
              type="number"
              placeholder="Ratings"
              step='.01'
              name="product_rating"
              value={UpdatedProduct.product_rating}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editProductItem d-flex flex-column mx-5 my-3">
            <label>Strike Price</label>
            <input
              type="number"
              placeholder="Strike Price"
              name="product_strike_price"
              value={UpdatedProduct.product_strike_price}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editProductItem d-flex flex-column mx-5 my-3">
            <label>Offers</label>
            <input
              type="number"
              placeholder="Offer"
              name="product_offer"
              value={UpdatedProduct.product_offer}
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
            <img src={product_image} alt='productImage' className='currentProductImage' />
          </div>


          <button className="editProductButton">Update</button>

        </form>
      </div>
    </>
  );
};

export default EditProduct;

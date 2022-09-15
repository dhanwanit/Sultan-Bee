import React, { useEffect, useState } from "react";
import "./productmanage.css";
import Sidebar from '../../Sidebar/Sidebar'


const ProductManagement = () => {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [products, setProducts] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [category, setCategoryId] = useState("");
  const [restaurant, setRestaurantId] = useState("");
  const [product_id, setProductId] = useState("");


  useEffect(() => {
    getCategories();
    getProducts();
  }, []);


  // Getting list of categories
  const getCategories = async () => {
    const resp = await fetch("http://localhost:8080/api/category/fetch_category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
    );

    const data = await resp.json();
    setCategories(data);
  };


  // Getting list of products
  const getProducts = async () => {
    let result = await fetch('http://localhost:8080/api/product/get_product', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    setProducts(data);
  }


  //Onchage handlers
  const handleCategorySelect = async (e) => {
    setCategoryName(e.target.value)
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option = el.getAttribute('id');
    setCategoryId(option)

    const resp = await fetch(`http://localhost:8080/api/restaurant/fetch_restaurant_by_categoryId/${option}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await resp.json();
    setRestaurants(data);
    console.log(data);
  };

  const handleRestaurantSelect = (e) => {
    setRestaurantId(e.target.value);
  };

  const handleProductSelect = (e) => {
    setProductId(e.target.value);
  };


  //Onsubmit handler
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log('OnsubmitHandler======>');
    console.log('categoryId===>', category);
    console.log('restaurantId===>', restaurant);
    console.log('productId===>', product_id);
    await fetch(`http://localhost:8080/api/product/product/${product_id}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, restaurant })
    }).then(r => {
      console.log(r)
    });
    setCategoryName('');
    setRestaurantId('');
    setProductId('');
  };


  return (
    <>
      <Sidebar />

      <div className="productManagement mt-4">
        <div className="productManagementHeader">
          <h1 className="productManagementTitle d-flex align-items-center justify-content-center">
            Product Management
          </h1>
        </div>

        <form
          onSubmit={formSubmitHandler}
          className="productManagementForm d-flex flex-column align-items-center justify-content-center"
        >
          <div className="productManagementItem d-flex flex-column mt-3 mx-5">
            <label>Category</label>
            <select
              value={categoryName}
              onChange={handleCategorySelect}
            >
              <option value="" default>Select Category</option>
              {categories.map((item, key) => {
                return (
                  <option key={key} id={item._id} value={item.category_name}>
                    {item.category_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="productManagementItem d-flex flex-column mt-3 mx-5">
            <label>Restaurant</label>
            <select
              name="Resturants"
              value={restaurant}
              onChange={handleRestaurantSelect}
            >
              <option value="" default>Select Restaurant</option>
              {restaurants.map((item, key) => {
                return (
                  <option key={key} value={item._id}>
                    {item.restaurant_name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="productManagementItem d-flex flex-column mt-3 mx-5">
            <label>Product</label>
            <select
              value={product_id}
              onChange={handleProductSelect}
            >
              <option value="" default> Select Product</option>
              {products.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.product_name}
                </option>
              ))}
            </select>
          </div>

          <button className="productManagementButton">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ProductManagement;

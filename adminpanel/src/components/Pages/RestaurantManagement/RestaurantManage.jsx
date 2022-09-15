import React, { useEffect, useState } from 'react'
import './restaurantmanage.css'
import Sidebar from '../../Sidebar/Sidebar'


const RestaurantManage = () => {
  const [categories, setCategories] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [selectedResturant, setSelectedResturant] = useState("");
  const [restaurant_id, setRestaurant_id] = useState('');
  const [category, setCategory] = useState("");

  useEffect(() => {
    getCategories();
    getRestaurants();
  }, [])

  const getCategories = async () => {
    let result = await fetch('http://localhost:8080/api/category/fetch_category');
    result = await result.json();
    console.log('category', result);
    setCategories(result);
  }

  const getRestaurants = async () => {
    let result = await fetch('http://localhost:8080/api/restaurant/fetch_restaurant');
    result = await result.json();
    console.log('restaurants', result);
    setRestaurant(result);
  }

  const handleResturantSelect = (e) => {
    setSelectedResturant(e.target.value);
    // console.log("Selected restaurant by onchange handler", selectedResturant);
    //  To get id of selected option
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index]
    const option = el.getAttribute('id');
    setRestaurant_id(option);
  }

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Selected category", category);
    console.log("Selected resturant id", restaurant_id);
    let result = await fetch('http://localhost:8080/api/restaurant/insert_restaurant', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, restaurant_id })
    }).then(r => {
      console.log(r)
    });
    setCategory('');
    setSelectedResturant('');
  }


  return (
    <>
      <Sidebar />
      <div className='restaurantManage mt-4'>
        <div className='restaurantManageHeader'>
          <h1 className='restaurantManageTitle d-flex align-items-center justify-content-center'>Restaurant Management</h1>
        </div>

        <form onSubmit={formSubmitHandler}
          className='restaurantManageForm d-flex flex-column align-items-center justify-content-center'
        >

          <div className='restaurantManageItem d-flex flex-column mt-3 mx-5'>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Select Category"
            >
              <option value='' default selected>Select Category</option>
              {categories.map((item) => (
                <option key={item._id} id={item._id} value={item.category_name} >
                  {item.category_name}
                </option>
              ))}
            </select>
          </div>

          <div className='restaurantManageItem d-flex flex-column mt-3 mx-5'>
            <label>Restaurant</label>
            <select name="Resturants"
              value={selectedResturant}
              onChange={(e) => handleResturantSelect(e)}>
              <option value='' default selected>Select Restaurant</option>
              {restaurant.map((item) => (
                <option key={item._id} id={item._id} value={item.restaurant_name}>
                  {item.restaurant_name}
                </option>
              ))}
            </select>
          </div>

          <button className='restaurantManageButton'>Submit</button>


        </form>
      </div>
    </>
  )
}

export default RestaurantManage
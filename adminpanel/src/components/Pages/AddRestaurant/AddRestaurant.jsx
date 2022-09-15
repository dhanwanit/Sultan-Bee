import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Sidebar from '../../Sidebar/Sidebar'
import './addrestaurant.css'

const AddRestaurant = () => {
  const [newRestaurant, setNewRestaurant] = useState({
    restaurant_name: '',
    restaurant_subName: '',
    phone: '',
    address: '',
    restaurant_rating: '',
    restaurant_distance: ''
  });
  const [restaurant_image, setRestaurantImage] = useState();
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setNewRestaurant({ ...newRestaurant, [name]: value });
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('restaurant_name', newRestaurant.restaurant_name);
    formData.append('restaurant_subName', newRestaurant.restaurant_subName);
    formData.append('phone', newRestaurant.phone);
    formData.append('address', newRestaurant.address);
    formData.append('restaurant_rating', newRestaurant.restaurant_rating);
    formData.append('restaurant_distance', newRestaurant.restaurant_distance);
    formData.append('restaurant_image', restaurant_image);
    let result = await fetch('http://localhost:8080/api/restaurant/restaurant', {
      method: 'post',
      body: formData
    }).then(r => {
      console.log(r);
    });
    swal({ title: "Restaurant Added Successfully!", icon: "success" });
    setNewRestaurant({
      restaurant_name: '',
      restaurant_subName: '',
      phone: '',
      address: '',
      restaurant_rating: '',
      restaurant_distance: ''
    });
    setRestaurantImage('');
    navigate('/hotels');
  }


  return (
    <>
      <Sidebar />
      <div className='addRestaurant mt-3 ms-5'>
        <div className='addRestaurantHeader'>
          <h1 className='addRestaurantTitle'>Add New Restaurant</h1>
        </div>

        <form
          onSubmit={onFormSubmit}
          encType="multipart/form-data"
          className="addRestaurantForm d-flex flex-wrap"
        >
          <div className="addRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Restaurant Name</label>
            <input
              type="text"
              placeholder="Restaurant Name"
              name="restaurant_name"
              value={newRestaurant.restaurant_name}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="addRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Restaurant Sub-Name</label>
            <input
              type="text"
              placeholder="Restaurant Sub-Name"
              name="restaurant_subName"
              value={newRestaurant.restaurant_subName}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="addRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Phone</label>
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              value={newRestaurant.phone}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="addRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={newRestaurant.address}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="addRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Ratings</label>
            <input
              type="number"
              placeholder="Ratings"
              step='.01'
              name="restaurant_rating"
              value={newRestaurant.restaurant_rating}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="addRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Distance</label>
            <input
              type="text"
              placeholder="Distance"
              step='.01'
              name="restaurant_distance"
              value={newRestaurant.restaurant_distance}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="addRestaurantItem d-flex flex-column mt-3 me-5">
            <label htmlFor="file">Photo</label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="restaurant_image"
              onChange={(e) => setRestaurantImage(e.target.files[0])}
              required
            />
          </div>
          <button className="addRestaurantButton">Create</button>

        </form>

      </div>
    </>
  )
}

export default AddRestaurant
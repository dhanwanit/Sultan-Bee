import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import './editrestaurant.css'
import swal from 'sweetalert';
import Sidebar from '../../Sidebar/Sidebar'

const EditRestaurant = () => {
  const [updatedRestaurant, setUpdatedRestaurant] = useState({
    restaurant_name: '',
    restaurant_subName: '',
    phone: '',
    address: '',
    restaurant_rating: '',
    restaurant_distance: ''
  });
  const [restaurant_image, setRestaurantImage] = useState();
  const navigate = useNavigate();
  const { hotelId } = useParams();

  useEffect(() => {
    getRestaurantDetail();
  }, []);

  const getRestaurantDetail = async () => {
    let result = await fetch(`http://localhost:8080/api/restaurant/fetch_restaurant_byId/${hotelId}`);
    result = await result.json();
    // console.log(result);
    setUpdatedRestaurant({
      restaurant_name: result[0].restaurant_name,
      restaurant_subName: result[0].restaurant_subName,
      phone: result[0].phone,
      address: result[0].address,
      restaurant_rating: result[0].restaurant_rating,
      restaurant_distance: result[0].restaurant_distance
    });
    setRestaurantImage(result[0].restaurant_image);
  }

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUpdatedRestaurant({ ...updatedRestaurant, [name]: value });
  }

  const onFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('restaurant_name', updatedRestaurant.restaurant_name);
    formData.append('restaurant_subName', updatedRestaurant.restaurant_subName);
    formData.append('phone', updatedRestaurant.phone);
    formData.append('address', updatedRestaurant.address);
    formData.append('restaurant_rating', updatedRestaurant.restaurant_rating);
    formData.append('restaurant_distance', updatedRestaurant.restaurant_distance);
    formData.append('restaurant_image', restaurant_image);

    await fetch(`http://localhost:8080/api/restaurant/update_restaurant_detail/${hotelId}`, {
      method: 'put',
      body: formData
    }).then((r) => {
      console.log(r);
    });
    swal({ title: "Restaurant Successfully Updated!", icon: "success" });
    setUpdatedRestaurant({
      restaurant_name: '',
      restaurant_subName: '',
      phone: '',
      address: '',
      restaurant_rating: '',
      restaurant_distance: ''
    });
    navigate('/hotels');
  }


  return (
    <>
      <Sidebar />
      <div className='editRestaurant mt-3 ms-5'>
        <div className='editRestaurantHeader'>
          <h1 className='editRestaurantTitle'>Edit Restaurant</h1>
        </div>

        <form
          onSubmit={onFormSubmit}
          encType="multipart/form-data"
          className="editRestaurantForm d-flex flex-wrap"
        >
          <div className="editRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Restaurant Name</label>
            <input
              type="text"
              placeholder="Restaurant Name"
              name="restaurant_name"
              value={updatedRestaurant.restaurant_name}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Restaurant Sub-Name</label>
            <input
              type="text"
              placeholder="Restaurant Sub-Name"
              name="restaurant_subName"
              value={updatedRestaurant.restaurant_subName}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={updatedRestaurant.phone}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={updatedRestaurant.address}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Ratings</label>
            <input
              type="text"
              placeholder="Ratings"
              step='.01'
              name="restaurant_rating"
              value={updatedRestaurant.restaurant_rating}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editRestaurantItem d-flex flex-column mt-3 me-5">
            <label>Distance</label>
            <input
              type="text"
              placeholder="Distance"
              name="restaurant_distance"
              value={updatedRestaurant.restaurant_distance}
              onChange={onChangeHandler}
            />
          </div>

          <div className="editRestaurantItem d-flex flex-column mt-3 me-5">
            <label htmlFor="file">Photo</label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="restaurant_image"
              onChange={(e) => setRestaurantImage(e.target.files[0])}
            />
          </div>

          <div className='editRestaurantItem ms-4 mt-4'>
            <span className='fw-bold me-3'>Current Image :</span>
            <img src={restaurant_image} alt='restaurantImage' className='currentRestaurantImage' />
          </div>

          <button className="editRestaurantButton">Update</button>

        </form>

      </div>
    </>
  )
}

export default EditRestaurant
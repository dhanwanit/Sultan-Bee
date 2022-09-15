import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './restaurantlist.css'
import { FormatListBulleted, DeleteOutline } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid'
import Sidebar from '../../Sidebar/Sidebar'
import swal from 'sweetalert';


const RestaurantList = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        getRestaurants();
    }, [])

    const columns = [
        // { field: '_id', headerName: 'ID', width: 200 },
        {
            field: 'restaurant_image',
            headerName: 'Image',
            width: 190,
            editable: true,
            renderCell: (params) => {
                return (
                    <div className='restaurantListImage_div'>
                        <img src={params.value} alt='hotel-logo' className='restaurantListImage' />
                    </div>
                )
            }
        },
        { field: 'restaurant_name', headerName: 'Name', width: 150, editable: true, },
        { field: 'restaurant_subName', headerName: 'SubName', width: 140, editable: true, },
        { field: 'restaurant_rating', headerName: 'Ratings', width: 130, editable: true, },
        { field: 'restaurant_distance', headerName: 'Distance', sortable: false, width: 110, },
        { field: 'phone', headerName: 'phone', sortable: false, width: 150, },
        { field: 'address', headerName: 'Address', sortable: false, width: 180, },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <Link to={"/hotel/" + params.row._id}>
                            <button className='userListEdit me-3 border-0 py-1 px-3'>Edit</button>
                        </Link>
                        <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row._id)} />
                    </div>
                )
            }
        }
    ];

    const getRestaurants = async () => {
        let result = await fetch('http://localhost:8080/api/restaurant/fetch_restaurant');
        result = await result.json();
        setHotels(result);
    }

    const handleDelete = async (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    //to reflect the removed menus on UI
                    setHotels(hotels.filter((item) => item._id !== id));
                    //fetch api
                    fetch(`http://localhost:8080/api/restaurant/delete_restaurant_detail/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });
                    swal("Poof! Restaurant details has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Restaurant details is safe!");
                }
            });
    }



    return (
        <>
            <Sidebar />
            <div className='restaurantList mt-3'>
                <div className='restaurantListHeader d-flex align-items-center justify-content-between mx-3 px-3 mb-3'>
                    <h3 className='restaurantListTitle'>
                        <FormatListBulleted className="me-2" />Restaurant List</h3>
                    <Link to='/newhotel'>
                        <button className='restaurantListButton'>Add Restaurant</button>
                    </Link>
                </div>

                <DataGrid
                    rows={hotels}
                    getRowId={(row) => row._id}
                    rowHeight={100}
                    columns={columns}
                    pageSize={8}
                    checkboxSelection
                    disableSelectionOnClick
                    style={{ marginLeft: '20px', marginRight: '20px' }}
                />
            </div>
        </>
    )
}

export default RestaurantList
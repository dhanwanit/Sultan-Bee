import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './menulist.css'
import { DataGrid } from '@material-ui/data-grid';
import { Menu, DeleteOutline } from '@material-ui/icons'
import Sidebar from '../../Sidebar/Sidebar'
import swal from 'sweetalert';


const MenuList = () => {
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        getMenusList();
    }, [])

    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        {
            field: 'category_image',
            headerName: 'Image',
            width: 200,
            editable: true,
            renderCell: (params) => {
                return (
                    <div className='category_image_div'>
                        <img src={params.value} alt='menus' className='category_image' />
                    </div>
                )
            }
        },
        { field: 'category_name', headerName: 'Menu name', width: 190, editable: true, },
        {
            field: 'action',
            headerName: 'Action',
            width: 190,
            renderCell: (params) => {
                return (
                    <div className='ms-4'>
                        <Link to={'/editmenu/' + params.row._id}>
                            <button className='productListEdit me-4 border-0 py-1 px-3'>Edit</button>
                        </Link>
                        <DeleteOutline className='productListDelete' onClick={() => handleDelete(params.row._id)} />
                    </div>
                )
            }

        }

    ];

    const getMenusList = async () => {
        let result = await fetch('http://localhost:8080/api/category/fetch_category');
        result = await result.json();
        setMenus(result);
    }

    const handleDelete = async (id) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    //to reflect the removed users on UI
                    setMenus(menus.filter((item) => item._id !== id));
                    //fetch api  
                    fetch(`http://localhost:8080/api/category/delete_category_detail/${id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });
                    swal("Poof! Menu detail has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Menu detail is safe!");
                }
            });
    }


    return (
        <>
            <Sidebar />
            <div className='menuList mt-3'>
                <div className='menuListHeader d-flex align-items-center justify-content-between mx-3 px-3 mb-3'>
                    <h3 className='menuListTitle'>
                        <Menu className='me-2' />Menu List</h3>
                    <Link to='/newmenu'>
                        <button className='menuListButton'>Add Menu</button>
                    </Link>
                </div>

                <DataGrid
                    rows={menus}
                    rowHeight={75}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSize={12}
                    checkboxSelection
                    disableSelectionOnClick
                    style={{ marginLeft: '20px', marginRight: '20px', marginBottom: '20px' }}
                />
            </div>
        </>
    )
}

export default MenuList
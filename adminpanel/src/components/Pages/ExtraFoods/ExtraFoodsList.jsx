import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../ProductList/productlist.css'
import { DataGrid } from '@material-ui/data-grid';
import { ViewList, DeleteOutline } from '@material-ui/icons'
import Sidebar from '../../Sidebar/Sidebar'
import swal from 'sweetalert';

const ExtraFoodsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const columns = [
        // { field: '_id', headerName: 'ID', width: 100 },
        {
            field: 'productImage',
            headerName: 'Image',
            width: 150,
            editable: true,
            renderCell: (params) => {
                return (
                    <div className='productImageDiv'>
                        <img src={params.value} alt='product' className='productImage' />
                    </div>
                )
            }
        },
        { field: 'productName', headerName: 'Name', width: 250, editable: true, },
        { field: 'productPrice', headerName: 'Price', width: 250, editable: true, },
        {
            field: 'action',
            headerName: 'Action',
            width: 250,
            renderCell: (params) => {
                return (
                    <div>
                        <Link to={"/food/" + params.row._id}>
                            <button className='productListEdit me-2 border-0 py-1 px-3'>Edit</button>
                        </Link>
                        <DeleteOutline className='productListDelete' onClick={() => handleDelete(params.row._id)} />
                    </div>
                )
            }

        }

    ];

    const getProducts = async () => {
        let result = await fetch('http://localhost:8080/api/admin/getproducts');
        result = await result.json();
        setProducts(result);
        // console.log(result);
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
                    //to reflect the removed menus on UI
                    setProducts(products.filter((item) => item._id !== id));
                    //fetch api  
                    fetch(`http://localhost:8080/api/admin/deleteproduct/${id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });
                    swal("Poof! Product detail has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Product detail is safe!");
                }
            });
    }

    return (
        <>
            <Sidebar />
            <div className='productList mt-3'>
                <div className='productListHeader d-flex align-items-center justify-content-between mx-3 px-3 mb-3'>
                    <h3 className='productListTitle'>
                        <ViewList className='me-2' />Extra Product List</h3>
                    <Link to='/newfood'>
                        <button className='productListButton'>Add Product</button>
                    </Link>
                </div>

                <DataGrid
                    rows={products}
                    rowHeight={100}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    disableSelectionOnClick
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                />
            </div>
        </>

    )
}

export default ExtraFoodsList
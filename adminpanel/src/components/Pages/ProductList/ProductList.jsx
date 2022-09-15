import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './productlist.css'
import { DataGrid } from '@material-ui/data-grid';
import { ViewList, DeleteOutline } from '@material-ui/icons'
import Sidebar from '../../Sidebar/Sidebar'
import swal from 'sweetalert';


const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const columns = [
        // { field: '_id', headerName: 'ID', width: 100 },
        {
            field: 'product_image',
            headerName: 'Image',
            width: 120,
            editable: true,
            renderCell: (params) => {
                return (
                    <div className='productImageDiv'>
                        <img src={params.value} alt='product' className='productImage' />
                    </div>
                )
            }
        },
        { field: 'product_name', headerName: 'Name', width: 150, editable: true, },
        { field: 'product_description', headerName: 'Description', width: 150, editable: true, },
        { field: 'product_price', headerName: 'Price', width: 110, editable: true, },
        { field: 'product_rating', headerName: 'Ratings', sortable: false, width: 100, },
        { field: 'product_strike_price', headerName: 'Strike', sortable: false, width: 90, },
        { field: 'product_offer', headerName: 'Offers', sortable: false, width: 90, },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <Link to={"/product/" + params.row._id}>
                            <button className='productListEdit me-2 border-0 py-1 px-3'>Edit</button>
                        </Link>
                        <DeleteOutline className='productListDelete' onClick={() => handleDelete(params.row._id)} />
                    </div>
                )
            }

        }

    ];

    const getProducts = async () => {
        let result = await fetch('http://localhost:8080/api/product/get_product');
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
                    fetch(`http://localhost:8080/api/product/delete_product_detail/${id}`, {
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
                        <ViewList className='me-2' />Product List</h3>
                    <Link to='/newproduct'>
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

export default ProductList
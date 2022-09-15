import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './userlist.css'
import { DataGrid } from '@material-ui/data-grid';
import { Group, DeleteOutline } from '@material-ui/icons'
import Sidebar from '../../Sidebar/Sidebar'
import swal from 'sweetalert';


const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);


    let Active;
    const deactivateUser = async (id) => {
        Active = e.target.value;
        await fetch(`http://192.168.1.30:8080/api/user/updateActiveValue/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ Active })
        })
    }


    const activateUser = async (id) => {
        Active = e.target.value;
        await fetch(`http://192.168.1.30:8080/api/user/updateActiveValue/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ Active })
        })
    }

    const columns = [
        // { field: '_id', headerName: 'ID', width: 120 },
        { field: 'full_name', headerName: 'Full name', width: 150, editable: true, },
        { field: 'email', headerName: 'Email', width: 190, editable: true, },
        { field: 'phone', headerName: 'Phone', width: 130, editable: true, },
        { field: 'allergy', headerName: 'Allergy', sortable: false, width: 160, },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <Link to={"/user/" + params.row._id}>
                            <button className='userListEdit me-3 border-0 py-1 px-3'>Edit</button>
                        </Link>
                        <DeleteOutline className='userListDelete' onClick={() => handleDelete(params.row._id)} />
                    </div>
                )
            }
        },
        {
            field: 'Status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => {
                return (
                    <div>
                        <span className='userListStatus'>Enable</span>
                        <input
                            type='radio'
                            name={params.row.full_name}
                            value="true"
                            defaultChecked={params.row.Active == true}
                            onChange={(e) => activateUser(e, params.row._id)}
                        />
                        &nbsp;

                        <span className='userListStatus'>Disable</span>
                        <input
                            type='radio'
                            name={params.row.full_name}
                            value="false"
                            defaultChecked={params.row.Active == false}
                            onChange={(e) => deactivateUser(e, params.row._id)}
                        />
                    </div>
                )
            }
        }
    ];


    const getUsers = async () => {
        let result = await fetch('http://192.168.1.30:8080/api/admin/get_user_data');
        result = await result.json();
        setUsers(result);
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
                    //to reflect the removed users on UI
                    setUsers(users.filter((item) => item._id !== id));
                    //fetch api  
                    fetch(`http://192.168.1.30:8080/api/admin/user_delete/${id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });
                    swal("Poof! User details has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("User details is safe!");
                }
            });
    }

    return (
        <>
            <Sidebar />
            <div className="userList mt-3">
                <div className='userListHeader d-flex align-items-center justify-content-between mx-3 px-3 mb-3'>
                    <h3 className='userListTitle'>
                        <Group className="me-2" />User List</h3>
                </div>

                <DataGrid
                    rows={users}
                    columns={columns}
                    getRowId={(row) => row._id}
                    rowHeight={100}
                    pageSize={10}
                    checkboxSelection
                    disableSelectionOnClick
                    style={{ marginLeft: '20px', marginRight: '20px' }}
                />
            </div>
        </>
    )
}

export default UserList
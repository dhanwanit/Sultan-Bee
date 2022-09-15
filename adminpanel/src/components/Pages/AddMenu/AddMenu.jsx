import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './addmenu.css'
import swal from 'sweetalert';
import Sidebar from '../../Sidebar/Sidebar'

const AddMenu = () => {
    const [category_name, setCategory_name] = useState();
    const [category_image, setCategory_image] = useState();
    const navigate = useNavigate();

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        // const file = document.getElementById('inputGroupFile01').files
        const formData = new FormData();
        formData.append('category_name', category_name);
        formData.append('category_image', category_image);
        await fetch('http://localhost:8080/api/category/insert_category_details', {
            method: 'post',
            body: formData
        }).then(r => {
            console.log(r)
        });
        swal({ title: "Menu Added Successfully!", icon: "success" });
        // console.log(category_name);
        // console.log(file[0])
        setCategory_name('');
        setCategory_image('');
        navigate('/menus');
    }

    return (
        <>
            <Sidebar />
            <div className='addMenu mt-3'>
                <div className='addMenuTitle'>
                    <h1 className='fw-bold d-flex align-items-center justify-content-center'>Add Menu</h1>
                </div>
                <form encType='multipart/form-data'
                    onSubmit={formSubmitHandler}
                    className="addMenuForm d-flex flex-column align-items-center justify-content-center mt-4"
                >
                    <div className='addMenuItem d-flex flex-column mt-3 me-5'>
                        <label className='ms-4'>Name</label>
                        <input
                            type='text'
                            placeholder='Name'
                            name='category_name'
                            value={category_name}
                            onChange={(e) => setCategory_name(e.target.value)}
                            className='ms-4'
                        />
                    </div>
                    <div className='addMenuItem d-flex flex-column mt-3 me-5'>
                        <label htmlFor='inputGroupFile01' className='ms-4'>Photo</label>
                        <input
                            type='file'
                            id='inputGroupFile01'
                            aria-describedby="inputGroupFileAddon01"
                            className='ms-4'
                            onChange={(e) => setCategory_image(e.target.files[0])}
                        />
                    </div>

                    <button className='addMenuButton'>Create</button>

                </form>
            </div>
        </>
    )
}

export default AddMenu
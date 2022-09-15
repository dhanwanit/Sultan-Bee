import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar/Sidebar'
import swal from 'sweetalert'
import '../AddMenu/addmenu.css';


const AddCategory = () => {
    const [categoryName, setCategoryName] = useState();
    const [categoryImage, setCategoryImage] = useState();
    const navigate = useNavigate();

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        // const file = document.getElementById('inputGroupFile01').files
        const formData = new FormData();
        formData.append('categoryName', categoryName);
        formData.append('categoryImage', categoryImage);
        await fetch('http://192.168.1.30:8080/api/admin/insertcategory', {
            method: 'post',
            body: formData
        }).then(r => {
            console.log(r)
        });
        swal({ title: "Menu Added Successfully!", icon: "success" });
        // console.log(category_name);
        // console.log(file[0])
        setCategoryName('');
        setCategoryImage('');
        navigate('/extracategories');
    }

    return (
        <>
            <Sidebar />
            <div className='addMenu mt-3'>
                <div className='addMenuTitle'>
                    <h1 className='fw-bold d-flex align-items-center justify-content-center'>Add Category</h1>
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
                            name='categoryName'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
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
                            onChange={(e) => setCategoryImage(e.target.files[0])}
                        />
                    </div>

                    <button className='addMenuButton'>Create</button>

                </form>
            </div>
        </>
    )
}

export default AddCategory
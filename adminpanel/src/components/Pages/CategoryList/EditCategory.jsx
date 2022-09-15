import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Sidebar from '../../Sidebar/Sidebar'

const EditCategory = () => {
    const [categoryName, setCategoryName] = useState();
    const [categoryImage, setCategoryImage] = useState();

    const { categoryId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getMenuById();
    }, []);


    const getMenuById = async () => {
        let result = await fetch(`http://localhost:8080/api/admin/getcategory_byName/${categoryId}`);
        result = await result.json();
        // console.log(result);
        setCategoryName(result.categoryName);
        setCategoryImage(result.categoryImage);

    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        // console.log(category_name, category_image);
        const formData = new FormData();
        formData.append('categoryName', categoryName);
        formData.append('categoryImage', categoryImage);
        await fetch(`http://localhost:8080/api/admin/updatecategory/${categoryId}`, {
            method: 'put',
            body: formData
        }).then(r => {
            console.log(r)
        });
        swal({ title: "Menu Successfully Updated!", icon: "success" });
        setCategoryName('');
        setCategoryImage('');
        navigate('/extracategories');
    }

    return (
        <>
            <Sidebar />
            <div className='editMenu'>
                <h1 className='editMenuTitle d-flex align-items-center justify-content-center'>Edit Category</h1>

                <form encType='multipart/form-data' onSubmit={formSubmitHandler}
                    className="editMenuForm d-flex flex-wrap mt-4">
                    <div className='editMenuItem d-flex flex-column mt-3 me-5'>
                        <label className='ms-4'>Name</label>
                        <input
                            type='text'
                            placeholder='Category name'
                            name='categoryName'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className='ms-4'
                        />
                    </div>
                    <div className='editMenuItem d-flex flex-column mt-3 me-5'>
                        <label htmlFor='inputGroupFile' className='ms-4'>Image</label>
                        <input
                            type='file'
                            id='inputGroupFile'
                            aria-describedby="inputGroupFileAddon"
                            className='ms-4'
                            name='categoryImage'
                            onChange={(e) => setCategoryImage(e.target.files[0])}
                        />
                        <div className='ms-5 mt-4'>
                            <span className='fw-bold me-3'>Current Image :</span>
                            <img src={categoryImage} alt='menu' className='currentImage ms-3' />
                        </div>

                    </div>
                    <button className='editMenuButton'>Update</button>

                </form>
            </div>
        </>

    )
}

export default EditCategory
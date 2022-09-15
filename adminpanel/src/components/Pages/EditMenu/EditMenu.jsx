import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import './editmenu.css'
import swal from 'sweetalert'
import Sidebar from '../../Sidebar/Sidebar'

const EditMenu = () => {
    const [category_name, setCategory_name] = useState();
    const [category_image, setCategory_image] = useState();

    const { menuId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getMenuById();
    }, []);


    const getMenuById = async () => {
        let result = await fetch(`http://localhost:8080/api/category/fetch_category_byName/${menuId}`);
        result = await result.json();
        // console.log(result);
        setCategory_name(result.category_name);
        setCategory_image(result.category_image);

    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        // console.log(category_name, category_image);
        const formData = new FormData();
        formData.append('category_name', category_name);
        formData.append('category_image', category_image);
        await fetch(`http://localhost:8080/api/category/update_category_detail/${menuId}`, {
            method: 'put',
            body: formData
        }).then(r => {
            console.log(r)
        });
        swal({ title: "Menu Successfully Updated!", icon: "success" });
        setCategory_name('');
        setCategory_image('');
        navigate('/menus');
    }

    return (
        <>
            <Sidebar />

            <div className='editMenu'>
                <h1 className='editMenuTitle d-flex align-items-center justify-content-center'>Edit Menu</h1>

                <form encType='multipart/form-data' onSubmit={formSubmitHandler}
                    className="editMenuForm d-flex flex-wrap mt-4">
                    <div className='editMenuItem d-flex flex-column mt-3 me-5'>
                        <label className='ms-4'>Name</label>
                        <input
                            type='text'
                            placeholder='Menu name'
                            name='category_name'
                            value={category_name}
                            onChange={(e) => setCategory_name(e.target.value)}
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
                            name='category_image'
                            onChange={(e) => setCategory_image(e.target.files[0])}
                        />
                        <div className='ms-5 mt-4'>
                            <span className='fw-bold me-3'>Current Image :</span>
                            <img src={category_image} alt='menu' className='currentImage ms-3' />
                        </div>

                    </div>
                    <button className='editMenuButton'>Update</button>

                </form>
            </div>
        </>
    )
}

export default EditMenu
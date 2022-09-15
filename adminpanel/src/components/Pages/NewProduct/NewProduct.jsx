import React, { useState } from "react";
import "./newproduct.css";
import swal from 'sweetalert';
import Sidebar from '../../Sidebar/Sidebar'
import { useNavigate } from "react-router-dom";


const NewUser = () => {
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        product_description: '',
        product_price: '',
        product_rating: '',
        product_strike_price: '',
        product_offer: '',
    });
    const [product_image, setProductImage] = useState();

    const onChangeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setNewProduct({ ...newProduct, [name]: value })
    }

    const navigate = useNavigate();

    const newProductSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', newProduct.product_name);
        formData.append('product_description', newProduct.product_description);
        formData.append('product_price', newProduct.product_price);
        formData.append('product_rating', newProduct.product_rating);
        formData.append('product_strike_price', newProduct.product_strike_price);
        formData.append('product_offer', newProduct.product_offer);
        formData.append('product_image', product_image);

        let result = await fetch('http://localhost:8080/api/product/insert_product', {
            method: 'post',
            body: formData
        }).then(r => {
            console.log(r);
        });
        swal({ 
            title: "Product Added Successfully!",
            icon: "success" 
        }). then(function() {
            navigate('/products')
            });
        setNewProduct({
            product_name: '',
            product_description: '',
            product_price: '',
            product_rating: '',
            product_strike_price: '',
            product_offer: '',
        })
        setProductImage('');
    };

    return (
        <>
            <Sidebar />
            <div className="newUser mt-4 ms-5">
                <h1 className="newUserTitle fw-bold ms-2">Add New Product</h1>
                <form
                    onSubmit={newProductSubmit}
                    encType="multipart/form-data"
                    className="newUserForm d-flex flex-wrap"
                >
                    <div className="newUserItem d-flex flex-column mt-3 me-5">
                        <label>Item Name</label>
                        <input
                            type="text"
                            placeholder="Item Name"
                            name="product_name"
                            value={newProduct.product_name}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>

                    <div className="newUserItem d-flex flex-column mt-3 me-5">
                        <label>Description</label>
                        <input
                            type="text"
                            placeholder="Description"
                            name="product_description"
                            value={newProduct.product_description}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>

                    <div className="newUserItem d-flex flex-column mt-3 me-5">
                        <label>Item Price</label>
                        <input
                            type="number"
                            placeholder="Price"
                            name="product_price"
                            value={newProduct.product_price}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>

                    <div className="newUserItem d-flex flex-column mt-3 me-5">
                        <label>Ratings</label>
                        <input
                            type="number"
                            placeholder="Rating"
                            step=".01"
                            name="product_rating"
                            value={newProduct.product_rating}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>

                    <div className="newUserItem d-flex flex-column mt-3 me-5">
                        <label>Strike Price</label>
                        <input
                            type="number"
                            placeholder="Strike Price"
                            name="product_strike_price"
                            value={newProduct.product_strike_price}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>

                    <div className="newUserItem d-flex flex-column mt-3 me-5">
                        <label>Offers</label>
                        <input
                            type="number"
                            placeholder="Offers"
                            name="product_offer"
                            value={newProduct.product_offer}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>

                    <div className="newUserItem d-flex flex-column mt-3 me-5">
                        <label htmlFor="file">Photo</label>
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="item_image"
                            onChange={(e) => setProductImage(e.target.files[0])}
                            required
                        />
                    </div>

                    <button className="newUserButton">Create</button>
                </form>
            </div>
        </>
    );
};

export default NewUser;

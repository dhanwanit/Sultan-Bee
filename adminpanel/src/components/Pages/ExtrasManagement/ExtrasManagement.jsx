import React, { useEffect, useState } from 'react'
import Sidebar from '../../Sidebar/Sidebar'

const ExtrasManagement = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [product_id, setProductId] = useState('');

    useEffect(() => {
        getCategories();
        getProducts();
    }, [])

    const getCategories = async () => {
        let result = await fetch('http://localhost:8080/api/admin/getcategory');
        result = await result.json();
        setCategories(result);
    }

    const getProducts = async () => {
        let result = await fetch('http://localhost:8080/api/admin/getproducts');
        result = await result.json();
        setProducts(result);
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8080/api/admin/product', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ category, product_id })
        }).then((r)=>{
            console.log(r);
        })
        setCategory('');
        setProductId('');
    }

    return (
        <>
            <Sidebar />
            <div className="productManagement mt-4">
                <div className="productManagementHeader">
                    <h1 className="productManagementTitle d-flex align-items-center justify-content-center">
                        Extras Product Management
                    </h1>
                </div>

                <form
                    onSubmit={formSubmitHandler}
                    className="productManagementForm d-flex flex-column align-items-center justify-content-center"
                >
                    <div className="productManagementItem d-flex flex-column mt-3 mx-5">
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" default>Select Category</option>
                            {categories.map((item, key) => {
                                return (
                                    <option key={key} id={item._id} value={item.categoryName}>
                                        {item.categoryName}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="productManagementItem d-flex flex-column mt-3 mx-5">
                        <label>Product</label>
                        <select
                            value={product_id}
                            onChange={(e) => setProductId(e.target.value)}
                        >
                            <option value="" default> Select Product</option>
                            {products.map((item) => (
                                <option key={item._id} value={item._id}>
                                    {item.productName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="productManagementButton">Submit</button>
                </form>
            </div>
        </>

    )
}

export default ExtrasManagement
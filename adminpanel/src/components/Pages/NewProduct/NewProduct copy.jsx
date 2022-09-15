import React, { useState } from 'react'
import './newproduct.css'
import { Publish } from '@material-ui/icons'

const NewUser = () => {
    const [newProduct, setNewProduct] = useState({
        item_name: '',
        item_description: '',
        item_price: '',
        item_image: '',
        item_qty: ''
    });
    const [category, setCategory] = useState([]);
    const [selectedResturant, setSelectedResturant] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const newProductSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append('item_name', newProduct.item_name);
        // formData.append('item_description', newProduct.item_description);
        // formData.append('item_price', newProduct.item_price);
        // formData.append('item_image', newProduct.item_image);
        // formData.append('item_qty', newProduct.item_qty);
        // let result = await fetch('http://localhost:8008/insert_items_details', formData);
        // result = await result.json();
        // console.log(result);
    }

    const Resturants = {
        SelectResturant: ["", "", "", ""],
        Lade_Kitchen: ["Burger", "Pizza", "Cold drinks", "Pasta", 'Chicken'],
        Wao: ["Burger", "Snacks", "Sandwitch", "Cold drinks"],
        Apna_Sweets: ["South indian", "Burger", "Sandwitch", 'Pasta'],
        Sharma_vishnu: ["Chinese", "Sandwitch", 'Pasta', "Pizza"]
    };
    const resturantList = Object.keys(Resturants).map(key => ({
        name: key
    }));


    const handleResturantSelect = (e) => {
        console.log("Selected resturant", e.target.value);
        const resturantSel = e.target.value;
        const categorySel = resturantSel !== "" ? Resturants[resturantSel] : [];
        setSelectedResturant(resturantSel);
        setCategory(categorySel);
        setSelectedCategory("");
    }

    const handleCategorySelect = (e) => {
        console.log("Selected category", e.target.value);
        const categoriesSel = e.target.value;
        setSelectedCategory(categoriesSel);
    }



    return (
        <div className='newUser'>
            <h1 className='newUserTitle fw-bold ms-2'>Add New Product</h1>
            <form onSubmit={newProductSubmit} encType='multipart/form-data' className="newUserForm d-flex flex-wrap">

                <div className='newUserItem d-flex flex-column mt-3 me-5'>
                    <label>Item Name</label>
                    <input
                        type='text'
                        placeholder='ItemName'
                        name='item_name'
                        value={newProduct.item_name}
                        onChange={(e) => setNewProduct({ item_name: e.target.value })}
                        required
                    />
                </div>
                <div className='newUserItem d-flex flex-column mt-3 me-5'>
                    <label>Description</label>
                    <input
                        type='text'
                        placeholder='Description'
                        name='item_description'
                        value={newProduct.item_description}
                        onChange={(e) => setNewProduct({ item_description: e.target.value })}
                        required
                    />
                </div>
                <div className='newUserItem d-flex flex-column mt-3 me-5'>
                    <label>Item Price</label>
                    <input
                        type='number'
                        placeholder='Price'
                        name='item_price'
                        value={newProduct.item_price}
                        onChange={(e) => setNewProduct({ item_price: e.target.value })}
                        required
                    />
                </div>
                <div className='newUserItem d-flex flex-column mt-3 me-5'>
                    <label htmlFor='file'>Photo</label>
                    <input
                        type='file'
                        accept=".png, .jpg, .jpeg"
                        name='item_image'
                        value={newProduct.item_image}
                        onChange={(e) => setNewProduct({ item_image: e.target.files[0] })}
                        required
                    />
                </div>
                <div className='newUserItem d-flex flex-column mt-3 me-5'>
                    <label>Resturant</label>
                    <select name="Resturants"
                        value={selectedResturant}
                        onChange={(e) => handleResturantSelect(e)}>
                        {resturantList.map((resturant, key) => (
                            <option key={key} value={resturant.name}>
                                {resturant.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='newUserItem d-flex flex-column mt-3 me-5'>
                    <label>Categroy</label>
                    <select name="Categories"
                        value={selectedCategory}
                        onChange={(e) => handleCategorySelect(e)}>
                        {category.map((category, key) => (
                            <option key={key} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>


                <button className='newUserButton'>Create</button>

            </form>
        </div>
    )
}

export default NewUser
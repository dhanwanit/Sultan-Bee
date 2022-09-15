import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Topbar from './components/Topbar/Topbar'
import './app.css'
import Home from './components/Pages/Home/Home'
import UserList from './components/Pages/UserList/UserList'
import User from './components/Pages/User/User'
import NewProduct from './components/Pages/NewProduct/NewProduct'
import ProductList from './components/Pages/ProductList/ProductList'
import AddMenu from './components/Pages/AddMenu/AddMenu'
import EditProduct from './components/Pages/EditProduct/EditProduct'
import MenuList from './components/Pages/MenuList/MenuList'
import EditMenu from './components/Pages/EditMenu/EditMenu'
import RestaurantList from './components/Pages/RestaurantList/RestaurantList'
import EditRestaurant from './components/Pages/EditRestaurant/EditRestaurant'
import AddRestaurant from './components/Pages/AddRestaurant/AddRestaurant'
import RestaurantManage from './components/Pages/RestaurantManagement/RestaurantManage'
import ProductManagement from './components/Pages/ProductManagement/ProductManagement'
import Login from './components/LoginScreen/Login'
import PrivateComponent from './components/PrivateComponent/PrivateComponent'
import Profile from './components/Profile/Profile'
import CategoryList from './components/Pages/CategoryList/CategoryList'
import ExtraFoodsList from './components/Pages/ExtraFoods/ExtraFoodsList'
import EditCategory from './components/Pages/CategoryList/EditCategory'
import AddCategory from './components/Pages/CategoryList/AddCategory'
import EditFoods from './components/Pages/ExtraFoods/EditFoods'
import AddFood from './components/Pages/ExtraFoods/AddFood'
import ExtrasManagement from './components/Pages/ExtrasManagement/ExtrasManagement'
import Orders from './components/OrderScreen/Orders'


const App = () => {
    return (
        <>
            <Topbar />
            <div className='d-flex'>

                <Routes>
                    {/* protected routes or private components. only showed when user loggedin*/}
                    <Route element={<PrivateComponent />}>
                        <Route path='/' element={<Home />} />

                        <Route path='/users' element={<UserList />} />
                        <Route path='/user/:userId' element={<User />} />

                        <Route path='/products' element={<ProductList />} />
                        <Route path='/product/:productId' element={<EditProduct />} />
                        <Route path='/newproduct' element={<NewProduct />} />

                        <Route path='/menus' element={<MenuList />} />
                        <Route path='/editmenu/:menuId' element={<EditMenu />} />
                        <Route path='/newmenu' element={<AddMenu />} />

                        <Route path='/hotels' element={<RestaurantList />} />
                        <Route path='/hotel/:hotelId' element={<EditRestaurant />} />
                        <Route path='/newhotel' element={<AddRestaurant />} />

                        <Route path='/extracategories' element={<CategoryList />} />
                        <Route path='/editcategory/:categoryId' element={<EditCategory />} />
                        <Route path='/newcategory' element={<AddCategory />} />

                        <Route path='/extrafoods' element={<ExtraFoodsList />} />
                        <Route path='/food/:foodId' element={<EditFoods />} />
                        <Route path='/newfood' element={<AddFood />} />

                        <Route path='/restaurant-management' element={<RestaurantManage />} />
                        <Route path='/product-management' element={<ProductManagement />} />
                        <Route path='/extras-management' element={<ExtrasManagement />} />

                        <Route path='/profile' element={<Profile />} />
                        <Route path='/orders' element={<Orders />} />
                    </Route>

                    <Route path='/login' element={<Login />} />
                </Routes>
            </div>
        </>
    )
}

export default App
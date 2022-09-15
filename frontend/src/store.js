import { applyMiddleware, combineReducers, createStore } from "redux"
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension"
import { userLoginReducer, userRegisterReducer, userDetailReducer, userUpateProfileReducer } from "./reducers/userReducer"
import { menuListReducer, hotelListReducer, productListReducer, productDetailsReducer, hotelDetailsReducer } from "./reducers/adminReducer"
import { ExtraCatListReducer, extraProListReducer } from "./reducers/extraReducer"
import { cartReducer } from "./reducers/cartReducer"
import { orderCreateReducer } from "./reducers/orderReducer";


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
const cartExtraItemsFromStorage = localStorage.getItem('cartExtraItems') ? JSON.parse(localStorage.getItem('cartExtraItems'))
    : [];
    const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}


const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdate: userUpateProfileReducer,
    menuList: menuListReducer,
    hotelList: hotelListReducer,
    productList: productListReducer,
    productDetail: productDetailsReducer,
    extraCat: ExtraCatListReducer,
    extraPro: extraProListReducer,
    cart: cartReducer,
    singleHotel: hotelDetailsReducer,
    orderCreate:orderCreateReducer,
    // cart:cartReducer
    // userCard:userCardReducer
})

//it mange whole project
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
   
    cart: { cartItems: cartItemsFromStorage, cartExtraItems: cartExtraItemsFromStorage,shippingAddress: shippingAddressFromStorage, }
}

//define thunk

const middleware = [thunk];

//create store object

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;


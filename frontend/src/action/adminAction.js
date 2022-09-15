import {
    GET_MENU_REQUEST,
    GET_MENU_SUCCESS,
    GET_MENU_FAIL,
    GET_HOTEL_REQUEST,
    GET_HOTEL_SUCCESS,
    GET_HOTEL_FAIL,
    GET_PRODUCT_REQUEST,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    GET_PRODUCT_ONE_REQUEST,
    GET_PRODUCT_ONE_SUCCESS,
    GET_PRODUCT_ONE_FAIL,
    GET_SINGLE_HOTEL_REQUEST,
    GET_SINGLE_HOTEL_SUCCESS,
    GET_SINGLE_HOTEL_FAIL
} from "../constants/adminConstant";
const axios = require("axios");
//const {useParams} =require("react-router-dom");



export const listMenu = () => async (dispatch) => {
    try {
        dispatch({ type: GET_MENU_REQUEST })
        const { data } = await axios.get('http://localhost:8080/api/category/fetch_category')
        dispatch({ type: GET_MENU_SUCCESS, payload: data, })

    } catch (error) {
        dispatch({
            type: GET_MENU_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
}



export const listHotel = (catId) => async (dispatch) => {
    try {
        dispatch({ type: GET_HOTEL_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const { data } = await axios.get(`http://localhost:8080/api/restaurant/fetch_restaurant_by_categoryId/${catId}`, config)
        //   console.log("batli sir", data);
        dispatch({
            type: GET_HOTEL_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GET_HOTEL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}



export const listProduct = (test_cat_id, rest_id) => async (dispatch) => {
    try {
        dispatch({ type: GET_PRODUCT_REQUEST })
        const { data } = await axios.get(`http://localhost:8080/api/product/fetch_product_by_categoryAndRestId/${test_cat_id}/${rest_id}`)
        // console.log("batli sir ka data", data);
        dispatch({ type: GET_PRODUCT_SUCCESS, payload: data, })

    } catch (error) {
        dispatch({
            type: GET_PRODUCT_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}



export const listProductDetails = (id) => async (dispatch) => {
    //const params = useParams();

    try {
        dispatch({ type: GET_PRODUCT_ONE_REQUEST })
        const { data } = await axios.get(`http://localhost:8080/api/product/get_product_byId/${id}`)

        console.log("listProductDetails api value", data);
        dispatch({
            type: GET_PRODUCT_ONE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GET_PRODUCT_ONE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}



export const singleHotelDetails = (id) => async (dispatch) => {
    //const params = useParams();
    try {
        dispatch({ type: GET_SINGLE_HOTEL_REQUEST })
        const { data } = await axios.get(`http://localhost:8080/api/restaurant/fetch_restaurant_byId/${id}`)
        console.log("singleHotelDetails api value", data);
        dispatch({ type: GET_SINGLE_HOTEL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: GET_SINGLE_HOTEL_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}
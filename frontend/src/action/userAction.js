import axios from 'axios'
import { USER_LOGOUT, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_CARD_FAIL, USER_CARD_REQUEST, USER_CARD_SUCCESS } from "../constants/userConstant";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_RESET, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from '../constants/userConstant';



export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }

        const { data } = await axios.post('http://192.168.1.30:8080/api/user/login', { email, password }, config)
        console.log("user Details", data);
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
        window.location.href = '/hotel'

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })
        // alert("Invalid user or password");
    }
}


export const register = (full_name, email, phone, password, allergy, name_on_card, card_no, expire_date, cvv) => async (dispatch) => {

    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://192.168.1.30:8080/api/user/register', { full_name, email, phone, password, allergy, name_on_card, card_no, expire_date, cvv }, config)
        console.log("userdata", data);
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })

    }

}

export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}


export const getUserDetails = () => async (dispatch, getState) => {

    try {
        dispatch({ type: USER_DETAILS_REQUEST })

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                // 'Content-Type':'application/json',
                Authentication: `Bearer, ${userInfo.token}`
            },

        }

        const { data } = await axios.get(`http://192.168.1.30:8080/api/user/get_single_user`, config)
        console.log("user details ", data);
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }

}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        console.log(user);
        // console.log(user.id);
        let _id = user.id;

        const { userLogin: { userInfo } } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                // 'Authentication': `Bearer, ${userInfo.token}`
                'Accept': 'application/json'
            }
        }
        const { data } = await axios.put(`http://192.168.1.30:8080/api/user/update/${_id}`, { full_name: user.full_name, email: user.email, phone: user.phone, allergy: user.allergy }, config)
        console.log("updateaction", data);
        dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
        window.location.reload();

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.response
        if (message === 'not Authorized , token failed') {
            dispatch(logout())
        }
        dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message })

    }

}
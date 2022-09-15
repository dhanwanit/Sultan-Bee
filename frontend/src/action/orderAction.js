import axios from 'axios';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
  
} from '../constants/orderConstant';




export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = { 
        headers: {
          'Content-Type': 'application/json',
          Authentication: `Bearer, ${userInfo.token}`
        },
      }
  
      const { data } = await axios.post(`http://192.168.1.30:8080/api/order/addOrderItems`, order, config)
      console.log("orders axction",data);
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
    //   dispatch({
    //     type: CART_CLEAR_ITEMS,
    //     payload: data,
    //   })
      localStorage.removeItem('cartItems')
    } catch (error) {
      const message =
      error.response && error.response.data.message

        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      // dispatch(logout())
    }
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    })
    }
}

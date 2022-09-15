
import axios from "axios";




import {ADD_TO_CART_REQUEST,ADD_TO_CART_SUCCESS,ADD_TO_CART_FAIL,
    GET_TO_CART_REQUEST,GET_TO_CART_SUCCESS,GET_TO_CART_FAIL,DELETE_ITEM
    ,ADD_TO_EXTRACART_SUCCESS,ADD_QUANTITY,SUB_QUANTITY,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstant';
 



export const getItemCart = (id) =>async(dispatch,getState)=>{
    try {
        dispatch({type:GET_TO_CART_REQUEST})
        const { data } = await axios.get(`http://localhost:8080/api/product/get_product_byId/${id}`)
         
       
          dispatch({
              type: GET_TO_CART_SUCCESS,
              payload:data 
            })
                
                 
        
    } catch (error) {
        dispatch({
            type:GET_TO_CART_FAIL,
            payload:
             error.response && error.response.data.message
             ? error.response.data.message
             : error.message,});
        
    }
   
}
   

export const addToCart = (id) =>async(dispatch,getState)=>{
    try {
        dispatch({type:ADD_TO_CART_REQUEST})
       
        const {data} = await axios.get(`http://localhost:8080/api/product/get_product_byId/${id}`)
       
         data.map((item=>{
            console.log("addtocart product",item);
            dispatch({
                type: ADD_TO_CART_SUCCESS,
                payload:
                {
                _id:item._id,
                product_description: item.product_description,
                product_image: item.product_image,
                product_name: item.product_name,
                product_offer: item.product_offer,
                product_price: item.product_price,
                product_rating: item.product_rating,
                product_strike_price: item.product_strike_price,
                qty:item.qty
              }
              })
                   localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));

         }))
        //   dispatch({
        //       type: ADD_TO_CART_SUCCESS,
        //       payload:data
        //     //   {
        //     //   product_description: datas.product_description,
        //     //   product_image: datas.product_image,
        //     //   product_name: datas.product_name,
        //     //   product_offer: datas.product_offer,
        //     //   product_price: datas.product_price,
        //     //   product_rating: datas.product_rating,
        //     //   product_strike_price: datas.product_strike_price,
        //     //   qty:datas.qty
        //     // }
        //     })
        //          localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
                 
        
    } catch (error) {
        dispatch({
            type:ADD_TO_CART_FAIL,
            payload:
             error.response && error.response.data.message
             ? error.response.data.message
             : error.message,});
        
    }
   
}
   


export const addQuantity = (id) =>(dispatch,getState)=> {
   
    try {
       

        
        dispatch({
            type: ADD_QUANTITY,
            payload:id
        })

        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
        
    } catch (error) {
        console.log("null");
        
    }
   
   
}

export const subQuantity = (id) =>(dispatch,getState)=> {
    
    try {
      
        dispatch({
            type: SUB_QUANTITY,
            payload:id
        })

        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
        
    } catch (error) {
        console.log("null");
    }
   
    
}

export const deleteItem = (id)=>(dispatch,getState)=>{
    try {
        dispatch({
            type: DELETE_ITEM,
        payload:id
        })
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
        
    } catch (error) {
        console.log("null");
        
    }
   
    
}



export const addExtraToCart = (id) =>async(dispatch,getState)=>{
    try {
     
        const { data } = await axios.get(`http://localhost:8080/api/admin/getproduct_byId/${id}`)
        
        console.log("add to cart api value",data);
          dispatch({
              type: ADD_TO_EXTRACART_SUCCESS,
              payload:data
          
            
            
            })
                 localStorage.setItem('cartExtraItems',JSON.stringify(getState().cart.cartExtraItems));
        
    } catch (error) {
       console.log(error);
        
    }
   
}





//to save shipping address
export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
    })
  
    localStorage.setItem('shippingAddress', JSON.stringify(data))
  }
  
  
  //for payment method
  
  export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
    })
  
    localStorage.setItem('paymentMethod', JSON.stringify(data))
  }
   
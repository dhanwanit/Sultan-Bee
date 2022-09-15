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
    } 
    from "../constants/adminConstant";
 


export const menuListReducer = (state = {menus:[]},action) => {

    switch(action.type)
    {
         case GET_MENU_REQUEST:
             return {loading:true,menus:[]};

          case GET_MENU_SUCCESS:
              return {loading:false,menus:action.payload};
            
          case GET_MENU_FAIL:
            return {loading:false,error:action.payload};
            default:
                return state;

    }
};

export const hotelListReducer = (state = {hotels:[]},action)=>{
    switch(action.type)
    {
        case GET_HOTEL_REQUEST:
        return {loading:true,hotels:[]};
        case GET_HOTEL_SUCCESS:
        return {loading:false,hotels:action.payload };
        case GET_HOTEL_FAIL:
        return {loading:false,error:action.payload};
        default :
        return state;
    }
}

export const productListReducer = (state={products:[]},action)=>{
    switch(action.type)
    {
        case GET_PRODUCT_REQUEST:
        return {loading:true,products:[]};
        case GET_PRODUCT_SUCCESS:
        return {loading:false,products:action.payload};
        case GET_PRODUCT_FAIL:
        return {loading:false,error:action.payload}
        default :return state;
    }
}



export const productDetailsReducer =(state ={product:{}},action) =>{

    switch(action.type)
    {
        case GET_PRODUCT_ONE_REQUEST:
            return {loading:true, product:{}}

         case GET_PRODUCT_ONE_SUCCESS : 
         return {loading:false,product:action.payload}

         case GET_PRODUCT_ONE_FAIL :
         return {loading:false,error:action.payload}
         default :
         return state;

        }
}



export const hotelDetailsReducer =(state ={hotel:{}},action) =>{

    switch(action.type)
    {
        case GET_SINGLE_HOTEL_REQUEST:
            return {loading:true, hotel:{}}

         case GET_SINGLE_HOTEL_SUCCESS : 
         return {loading:false,hotel:action.payload}

         case GET_SINGLE_HOTEL_FAIL :
         return {loading:false,error:action.payload}
         default :
         return state;

        }
}
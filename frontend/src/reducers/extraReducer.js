import {
    GET_EXTRACAT_REQUEST,
    GET_EXTRACAT_SUCCESS,
    GET_EXTRACAT_FAIL,
    GET_EXTRAPRO_REQUEST,
    GET_EXTRAPRO_SUCCESS,
    GET_EXTRAPRO_FAIL,

    
    } 
    from "../constants/extraConstant";


export const ExtraCatListReducer = (state = {extracats:[]},action) => {

    switch(action.type)
    {
         case GET_EXTRACAT_REQUEST:
             return {loading:true,extracats:[]};

          case GET_EXTRACAT_SUCCESS:
              return {loading:false,extracats:action.payload};
            
          case GET_EXTRACAT_FAIL:
            return {loading:false,error:action.payload};
            default:
                return state;

    }
};

export const extraProListReducer = (state = {extraproducts:[]},action)=>{
    switch(action.type)
    {
        case GET_EXTRAPRO_REQUEST:
        return {loading:true,extraproducts:[]};
        case GET_EXTRAPRO_SUCCESS:
        return {loading:false,extraproducts:action.payload };
        case GET_EXTRAPRO_FAIL:
        return {loading:false,error:action.payload};
        default :
        return state;
    }
}
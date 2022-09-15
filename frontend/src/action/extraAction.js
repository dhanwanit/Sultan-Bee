import {
    GET_EXTRACAT_REQUEST,
    GET_EXTRACAT_SUCCESS,
    GET_EXTRACAT_FAIL,
    GET_EXTRAPRO_REQUEST,
    GET_EXTRAPRO_SUCCESS,
    GET_EXTRAPRO_FAIL,
    
    
 } 
    from "../constants/extraConstant";
    const axios = require("axios");


export const listExtraCat = () => async (dispatch)=>  {
    try {
        
        dispatch({
            type:GET_EXTRACAT_REQUEST
        })
        
        const { data } = await axios.get('http://localhost:8080/api/admin/getcategory')
       
        
        dispatch({
            type:GET_EXTRACAT_SUCCESS,
            payload:data,
        })
         
    } catch (error) {
        dispatch({
            type:GET_EXTRACAT_FAIL,
            payload:
             error.response && error.response.data.message
             ? error.response.data.message
             : error.message,});
        }}


        export const listExtraProduct = (id) => async (dispatch)=> {
            try { dispatch({type:GET_EXTRAPRO_REQUEST})
            const config = {
                headers:{
                    'Content-Type':'application/json'
                },
                
            }
                      const { data } = await axios.get(`http://localhost:8080/api/admin/fetch_product_by_categoryId/${id}`,config)
                      console.log("batli extra sir", data);
                       dispatch({ type:GET_EXTRAPRO_SUCCESS,
                          payload:data,})
                
            } catch (error) {
                   dispatch({
                    type:GET_EXTRAPRO_FAIL, 
                    payload:error.response && error.response.data.message 
                    ? error.response.data.message
                    :error.message,}) }
                   }
    
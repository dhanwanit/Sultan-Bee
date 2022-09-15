
// import {
//   ADD_TO_CART,
//   REMOVE_ITEM,
//   SUB_QUANTITY,
//   ADD_QUANTITY,
  
// } from "../constants/cartConstant";

// const initState = {
//   items: [
  
  
//     {
//       id: 6,
//       title: "Blues",
//       desc:
//         "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
//       price: 90,
     
//     },
//   ],
//   addedItems: [],
//   total: 0,
//   counter: 0,
// };
// export  const cartReducer = (state = {cartItems:[]}, action) => {

//   //INSIDE HOME COMPONENT
//   if (action.type === ADD_TO_CART) {
//     let addedItem = state.items.find((item) => item.id === action.id);
//     //check if the action id exists in the addedItems
//     let existed_item = state.addedItems.find((item) => action.id === item.id);
//     if (existed_item) {
//       addedItem.quantity += 1;
//       return {
//         ...state,
//         total: state.total + addedItem.price,

//       };
//     } else {
//       addedItem.quantity = 1;
//       //calculating the total
//       let newTotal = state.total + addedItem.price;

//       return {
//         ...state,
//         addedItems: [...state.addedItems, addedItem],
//         total: newTotal, 

//         //counter product add to cart
//         counter: state.counter + 1,
//       };
//     }
//   }

//   if (action.type === REMOVE_ITEM) {
//     let itemToRemove = state.addedItems.find((item) => action.id === item.id);
//     let new_items = state.addedItems.filter((item) => action.id !== item.id);

//     //calculating the total
//     let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
//     console.log(itemToRemove);
//     return {
//       ...state,
//       addedItems: new_items,
//       total: newTotal,
//       counter: state.counter - 1,
//     };
//   }
//   //INSIDE CART COMPONENT
//   if (action.type === ADD_QUANTITY) {
//     let addedItem = state.items.find((item) => item.id === action.id);
//     addedItem.quantity += 1;
//     let newTotal = state.total + addedItem.price;
//     return {
//       ...state,
//       total: newTotal,
//     };
//   }
//   if (action.type === SUB_QUANTITY) {
//     let addedItem = state.items.find((item) => item.id === action.id);
//     //if the qt == 0 then it should be removed
//     if (addedItem.quantity === 1) {
//       let new_items = state.addedItems.filter((item) => item.id !== action.id);
//       let newTotal = state.total - addedItem.price;
//       return {
//         ...state,
//         addedItems: new_items,
//         total: newTotal,
//       };
//     } else {
//       addedItem.quantity -= 1;
//       let newTotal = state.total - addedItem.price;
//       return {
//         ...state,
//         total: newTotal,
//       };
//     }
//   }
//   return state;
// };

// // export default cartReducer;















import { ADD_TO_CART_REQUEST,ADD_TO_CART_SUCCESS,ADD_TO_CART_FAIL,
    GET_TO_CART_REQUEST,GET_TO_CART_SUCCESS,GET_TO_CART_FAIL
    ,ADD_TO_EXTRACART_SUCCESS, 
    ADD_QUANTITY,DELETE_ITEM,
    
    SUB_QUANTITY,CART_SAVE_SHIPPING_ADDRESS,CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstant';



export const cartReducer = (state={cartItems:[],cartExtraItems:[]}, action)=>{
   
    switch(action.type){

        case GET_TO_CART_REQUEST:
               
            return {
               
              
              loading:true,cartItems:[],cartExtraItems:[]};

             case GET_TO_CART_SUCCESS:
                
             return {loading:false,...state,cartItems:[...state.cartItems,action.payload]}
            
            
       
                 case GET_TO_CART_FAIL:
                 return {loading:false,error:action.payload};
      

            case ADD_TO_CART_REQUEST:
             
            return { loading:true,cartItems:[],cartExtraItems:[]};

             case ADD_TO_CART_SUCCESS:
                console.log("reducer cartitems",state.cartItems);
               
                const item = action.payload
                const existItem = state.cartItems.find(x=>x._id===item) 
               if(existItem)
               {
                   return{
                    ...state,
                    cartItems : state.cartItems.map(x=>x._id === existItem._id ? item : x)
    
                   }
                   
               }else{
                   return{
                    ...state, 
                    cartItems:[...state.cartItems,item]
    
                   }    
               }
            
             case ADD_TO_EXTRACART_SUCCESS:
             return {loading:false,cartExtraItems:action.payload};
        
       
                 case ADD_TO_CART_FAIL:
                 return {loading:false,error:action.payload};
      


    //     case ADD_TO_CART:
    //       const item = action.payload
         
    //       const existItem = state.cartItems.find(x=>x.product===item.product) 
    //      if(existItem)
    //      {
    //          return{
    //           ...state,
    //           cartItems : state.cartItems.map(x=>x.product === existItem.product ? item : x)

    //          }
             
    //      }else{
    //          return{
    //           ...state, 
    //           cartItems:[item]

    //          }    
    //      }
            
        case ADD_QUANTITY:
         
          
            return {
               
              ...state,
              cartItems:state.cartItems.map((item)=>item._id === action.payload ? {...item,qty:item.qty+1 }:item)
            
            } 
        
        
        
        
        
        
        
            case DELETE_ITEM:
            let newCartItems = state.cartItems.filter(
                (item) => {return item._id != action.payload}
            )
           
            return {
                ...state,
               
                cartItems:newCartItems,
            }
        case SUB_QUANTITY:
            return {
                ...state,
            cartItems:state.cartItems.map((item)=>item._id === action.payload ? {...item, qty:item.qty-1 }: item  
                ),
            }

            case CART_SAVE_SHIPPING_ADDRESS:
                return {
                  ...state,
                  shippingAddress: action.payload,
                }

         case CART_SAVE_PAYMENT_METHOD:
                    return {
                      ...state,
                      paymentMethod: action.payload,
                    }
        
            default:
                return state;
     

}  

}


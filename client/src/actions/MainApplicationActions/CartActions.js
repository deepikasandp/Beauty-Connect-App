import * as types from '../ActionTypes';

export function addToCart(data){
  return{
      type: types.CART_ADD_ITEM,
      data: data
  }
};

export function removeFromCart(id){
  return{
      type: types.CART_REMOVE_ITEM,
      id: id
    }
};

export function saveShippingAddress(data){
  return{
    type: types.CART_SAVE_SHIPPING_ADDRESS,
    data: data,
  }
};

export function savePaymentMethod(data){
  return{
    type: types.CART_SAVE_PAYMENT_METHOD,
    data: data,
  }
};

export function clearCartItems(data){
  return{
    type: types.CART_CLEAR_ITEMS
  }
};
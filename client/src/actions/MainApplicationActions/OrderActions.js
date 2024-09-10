import * as types from '../ActionTypes';

export function getOrderByID(id){
  return{
      type: types.ORDER_DETAILS_REQUEST,
      id: id
  }
};

export function createOrder(data){
  return{
      type: types.ORDER_CREATE_REQUEST,
      data: data
  }
};

export function clearOrderReset(data){
  return{
      type: types.ORDER_CREATE_RESET
  }
};

export function listMyOrders(){
  return{
      type: types.ORDER_LIST_MY_REQUEST
  }
};

export function payOrderByID(id, data){
  return{
      type: types.ORDER_PAY_REQUEST,
      id: id,
      data: data
  }
};

export function deliverOrderByID(id){
  return{
      type: types.ORDER_DELIVER_REQUEST,
      id: id
  }
};
  
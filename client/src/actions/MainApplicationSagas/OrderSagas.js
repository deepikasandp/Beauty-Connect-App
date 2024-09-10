import * as types from '../ActionTypes';
import * as api from '../../api';
import { call, put } from 'redux-saga/effects';
import { toastSuccess, toastFail } from '../../helper';

export function* getOrderByID(action){
    try{
        const params = {};
        params.id= action.id;

        const data = yield call(api.getOrderByID, params);
        yield put({type: types.ORDER_DETAILS_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.ORDER_DETAILS_FAIL, error:e});
    }
};

export function* createOrder(action){
    try{
        const params = {};
        params.data= action.data;

        const data = yield call(api.createOrder, params);
        yield put({type: types.ORDER_CREATE_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.ORDER_CREATE_FAIL, error:e});
    }
};

export function* listMyOrders(action){
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }

        const data = yield call(api.listMyOrders, params);
        yield put({type: types.ORDER_LIST_MY_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.ORDER_LIST_MY_FAIL, error:e});
    }
};

export function* payOrderByID(action){
    try{
        const params = {};
        params.id = action.id;
        params.data = action.data;

        const data = yield call(api.payOrderByID, params);
        yield put({type: types.ORDER_PAY_SUCCESS, data:data});
        yield put({type: types.ORDER_DETAILS_REQUEST, id:action.id});
    }catch (e){
        yield put({type:types.ORDER_PAY_FAIL, error:e});
    }
};

export function* deliverOrderByID(action){
    try{
        const params = {};
        params.id = action.id;

        const data = yield call(api.deliverOrderByID, params);
        yield put({type: types.ORDER_DELIVER_SUCCESS, data:data});
        yield put({type: types.ORDER_LIST_MY_REQUEST, id:action.id});
    }catch (e){
        yield put({type:types.ORDER_DELIVER_FAIL, error:e});
    }
};
import * as types from '../ActionTypes';
import * as api from '../../api';
import { call, put } from 'redux-saga/effects';

/** saga utility functions */
const delay = time => new Promise(resolve => setTimeout(resolve, time));

export function* setToast(action){
    yield put({ type: types.SET_TOASTER_SUCCESS, data: action.data });
    yield call(delay, 5000);
    yield put({ type: types.REMOVE_TOASTER, data: action.data });
};

export function* loadUser(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        const data = yield call(api.loadUser, params);
        yield put({type: types.USER_LOADED, data:data});
    }catch (e){
        yield put({type:types.AUTH_ERROR, error:e});
    }
};

export function* registerUser(action) {
    try{
        const params = {};
        params.data = action.data;
        const data = yield call(api.registerUser, params);
        yield put({type: types.REGISTER_USER_SUCCESS, data:data});
        yield put({type: types.USER_AUTH});
    }catch (e){
        yield put({type:types.REGISTER_USER_FAILED, error:e});
    }
};

export function* loginUser(action) {
    try{
        const params = {};
        params.data = action.data;
        if(localStorage.token){
            params.token = localStorage.token;
        }
        const data = yield call(api.loginUser, params);
        yield put({type: types.LOGIN_USER_SUCCESS, data:data});
        yield put({type: types.USER_AUTH});
    }catch (e){
        yield put({type:types.LOGIN_USER_FAILED, error:e});
    }
};

export function* deleteAccount(action) {
    if(window.confirm('Are you sure? This can NOT be undone!')){
        try{
            const params = {};
            if(localStorage.token){
                params.token = localStorage.token;
            }
            const data = yield call(api.deleteAccount, params);
            yield put({type: types.DELETE_ACCOUNT_SUCCESS, data:data});
            yield put(toastSuccess('Your account has been permanantly deleted'));
        }catch (e){
            yield put({type:types.DELETE_ACCOUNT_FAILED, error:e});
        }
    }
};
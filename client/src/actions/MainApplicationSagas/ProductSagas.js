import * as types from '../ActionTypes';
import * as api from '../../api';
import { call, put } from 'redux-saga/effects';
import { toastSuccess, toastFail } from '../../helper';

export function* listProducts(action){
    try{
        const params = {};
        params.keyword = action.keyword ? action.keyword : null;
        params.pageNumber = action.pageNumber;

        const data = yield call(api.listProducts, params);
        yield put({type: types.PRODUCT_LIST_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.PRODUCT_LIST_FAIL, error:e});
    }
};

export function* listProductDetails(action){
    try{
        const params = {};
        params.id = action.id;

        const data = yield call(api.listProductDetails, params);
        yield put({type: types.PRODUCT_DETAILS_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.PRODUCT_DETAILS_FAIL, error:e});
    }
};

export function* deleteProduct(action){
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.id = action.id;

        const data = yield call(api.deleteProduct, params);
        yield put({type: types.PRODUCT_DELETE_SUCCESS, data:data});
        yield put({type: types.PRODUCT_LIST_REQUEST});
        yield put(toastSuccess('Product Deleted'));
    }catch (e){
        yield put({type:types.PRODUCT_DELETE_FAIL, error:e});
    }
};

export function* createProduct(action){
    try{
        const params = {};
        params.data = action.data;
        if(localStorage.token){
            params.token = localStorage.token;
        }

        const data = yield call(api.createProduct, params);
        yield put({type: types.PRODUCT_CREATE_SUCCESS, data:data});
        yield put(toastSuccess('Product Created'));
    }catch (e){
        yield put(toastFail(e.message));
        yield put({type:types.PRODUCT_CREATE_FAIL, error:e});
    }
};

export function* updateProduct(action){
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.product = action.product;

        const data = yield call(api.updateProduct, params);
        yield put({type: types.PRODUCT_UPDATE_SUCCESS, data:data});
        // yield put({type: types.PRODUCT_LIST_REQUEST});
        yield put(toastSuccess('Product Updated'));
    }catch (e){
        yield put({type:types.PRODUCT_UPDATE_FAIL, error:e});
    }
};

export function* createProductReview(action){
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.productId= action.productId;
        params.reviewObj= action.reviewObj;

        const data = yield call(api.createProductReview, params);
        yield put({type: types.PRODUCT_CREATE_REVIEW_SUCCESS, data:data});
        yield put({type: types.PRODUCT_DETAILS_REQUEST, id:action.productId});
        yield put(toastSuccess('Review Added Successfully'));
    }catch (e){
        yield put({type:types.PRODUCT_CREATE_REVIEW_FAIL, error:e});
        yield put(toastSuccess('Unable to Add Review'));
    }
};

export function* listTopProducts(action){
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }

        const data = yield call(api.listTopProducts, params);
        yield put({type: types.PRODUCT_TOP_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.PRODUCT_TOP_FAIL, error:e});
    }
};

export function* uploadImageFile(action){
    try{
        const params = {};
        params.data= action.data;
        const data = yield call(api.uploadImageFile, params);
        yield put({type: types.PRODUCT_UPLOAD_IMAGE_FILE_SUCCESS, data:data});
        yield put(toastSuccess('Image Uploaded Successfully'));
    }catch (e){
        yield put({type:types.PRODUCT_UPLOAD_IMAGE_FILE_FAIL, error:e});
    }
};

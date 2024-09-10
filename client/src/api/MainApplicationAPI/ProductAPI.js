import { setAuthToken } from '../../helper/setAuthToken';
import { formdataHeaders } from '../../helper/formdataHeaders';
import axios from 'axios';
import { call, put } from 'redux-saga/effects';

export async function listProducts(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'GET'
        };
        const response = await fetch(`http://localhost:5000/api/products?keyword=${params.keyword}&pageNumber=${params.pageNumber}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function listProductDetails(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'GET'
        };
        const response = await fetch(`http://localhost:5000/api/products/product/${params.id}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function deleteProduct(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: setAuthToken(params.token)
        };
        const response = await fetch(`http://localhost:5000/api/products/${params.id}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function createProduct(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch(`http://localhost:5000/api/products`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function updateProduct(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.product)
        };
        const response = await fetch(`http://localhost:5000/api/products/update/${params.product._id}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function createProductReview(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.reviewObj)
        };
        const response = await fetch(`http://localhost:5000/api/products/reviews/${params.productId}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function listTopProducts(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'GET'
        };
        
        const response = await fetch(`http://localhost:5000/api/products/top`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function uploadImageFile(params) {
    try{
        const formData = new FormData();
        formData.append('image', params.data);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        const response = await axios.post("http://localhost:5000/api/products/upload",formData,config).then(res => {
            const result = res.data;
            return result;
        });
/*
        const options = {
            headers: formdataHeaders(params),
            mode: 'cors',
            method: 'POST',
            body: formData
        };
        const response = await fetch(`http://localhost:5000/api/products/upload`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);*/
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

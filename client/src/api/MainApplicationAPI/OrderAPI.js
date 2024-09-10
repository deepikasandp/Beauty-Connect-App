import { setAuthToken } from '../../helper/setAuthToken';
import { formdataHeaders } from '../../helper/formdataHeaders';
import axios from 'axios';
import { call, put } from 'redux-saga/effects';

export async function getOrderByID(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'GET',
            headers: setAuthToken(params.token),
        };
        const response = await fetch(`http://localhost:5000/api/orders/order/${params.id}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function payOrderByID(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch(`http://localhost:5000/api/orders/order/${params.id}/pay`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function deliverOrderByID(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token)
        };
        const response = await fetch(`http://localhost:5000/api/orders/order/${params.id}/deliver`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function createOrder(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch(`http://localhost:5000/api/orders`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

export async function listMyOrders(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'GET',
            headers: setAuthToken(params.token)
        };
        const response = await fetch(`http://localhost:5000/api/orders/myorders`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.error.message;
        throw e;
    }
};

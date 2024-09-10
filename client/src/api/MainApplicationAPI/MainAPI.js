import { setAuthToken } from '../../helper/setAuthToken';

export async function loadUser(params){
    try{
        const options = {
            mode: 'cors',
            method: 'GET',
            headers: setAuthToken(params.token)
        };
        const response = await fetch(`http://localhost:5000/api/auth`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function registerUser(params){
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },            
            body: JSON.stringify(params.data)
        };
        const response = await fetch(`http://localhost:5000/api/users`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function loginUser(params){
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch(`http://localhost:5000/api/auth`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function deleteAccount(params){
    try{
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: setAuthToken(params.token)
        };
        const response = await fetch('http://localhost:5000/api/profile/',options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};
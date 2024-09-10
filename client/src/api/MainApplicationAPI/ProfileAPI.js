import { setAuthToken } from '../../helper/setAuthToken';

export async function createProfile(params){
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch('http://localhost:5000/api/profile',options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function getProfile(params){
    try{
        const options = {
            mode: 'cors',
            method: 'GET',
            headers: setAuthToken(params.token)
        };
        const response = await fetch('http://localhost:5000/api/profile/me',options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function getAllProfiles(params){
    try{
        const options = {
            mode: 'cors',
            method: 'GET',
            headers: setAuthToken(params.token)
        };
        const response = await fetch('http://localhost:5000/api/profile/all',options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function getProfileByID(params){
    try{
        const options = {
            mode: 'cors',
            method: 'GET',
            headers: setAuthToken(params.token)
        };
        const response = await fetch(`http://localhost:5000/api/profile/user/${params.user_id}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function addExperience(params){
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch('http://localhost:5000/api/profile/experience',options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function addEducation(params){
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch('http://localhost:5000/api/profile/education',options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function deleteExperience(params){
    try{
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: setAuthToken(params.token)
        };
        const response = await fetch(`http://localhost:5000/api/profile/experience/${params.exp_id}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function deleteEducation(params){
    try{
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: setAuthToken(params.token)
        };
        const response = await fetch(`http://localhost:5000/api/profile/education/${params.edu_id}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};
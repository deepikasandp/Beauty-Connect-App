import { setAuthToken } from '../../helper/setAuthToken';

export async function getPosts(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'GET'
        };
        const response = await fetch('http://localhost:5000/api/posts',options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function addLike(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch(`http://localhost:5000/api/posts/like/${params.postId}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function removeLike(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch(`http://localhost:5000/api/posts/unlike/${params.postId}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function deletePost(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: setAuthToken(params.token)
        };
        const response = await fetch(`http://localhost:5000/api/posts/${params.postId}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function addPost(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch('http://localhost:5000/api/posts',options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function getPost(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'GET',
            headers: setAuthToken(params.token)
        };
        const response = await fetch(`http://localhost:5000/api/posts/${params.postId}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function addComment(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: setAuthToken(params.token),
            body: JSON.stringify(params.data)
        };
        const response = await fetch(`http://localhost:5000/api/posts/comment/${params.postId}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};

export async function deleteComment(params) {
    try{
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: setAuthToken(params.token)
        };
        const response = await fetch(`http://localhost:5000/api/posts/${params.postId}/${params.commentId}`,options);
        if(!response.ok) throw new Error('Fail to request API');
        return response.json().then(json => json, () => undefined);
    }catch (e){
        const err = e.response.data.errors;
        throw e;
    }
};
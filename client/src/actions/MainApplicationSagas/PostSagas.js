import * as types from '../ActionTypes';
import * as api from '../../api';
import { call, put } from 'redux-saga/effects';
import { toastSuccess, toastFail } from '../../helper';

export function* getPosts(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }

        const data = yield call(api.getPosts, params);
        yield put({type: types.GET_POSTS_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.GET_POSTS_FAILED, error:e});
    }
};

export function* addLike(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.postId = action.postId;

        const data = yield call(api.addLike, params);
        yield put({type: types.ADD_LIKE_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.ADD_LIKE_FAILED, error:e});
    }
};

export function* removeLike(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.postId = action.postId;

        const data = yield call(api.removeLike, params);
        yield put({type: types.REMOVE_LIKE_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.REMOVE_LIKE_FAILED, error:e});
    }
};

export function* deletePost(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.postId = action.postId;

        const data = yield call(api.deletePost, params);
        yield put({type: types.DELETE_POST_SUCCESS, data:data});
        yield put({type: types.GET_POSTS});
    }catch (e){
        yield put({type:types.DELETE_POST_FAILED, error:e});
    }
};

export function* addPost(action) {
    try{
        const params = {};
        params.data = action.data;
        if(localStorage.token){
            params.token = localStorage.token;
        }

        const data = yield call(api.addPost, params);
        yield put({type: types.ADD_POST_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.ADD_POST_FAILED, error:e});
    }
};

export function* getPost(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.postId = action.postId;

        const data = yield call(api.getPost, params);
        yield put({type: types.GET_POST_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.GET_POST_FAILED, error:e});
    }
};

export function* addComment(action) {
    try{
        const params = {};
        params.data = action.data;
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.postId = action.postId;

        const data = yield call(api.addComment, params);
        yield put({type: types.ADD_COMMENT_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.ADD_COMMENT_FAILED, error:e});
    }
};

export function* deleteComment(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.postId = action.postId;
        params.commentId = action.commentId;

        const data = yield call(api.deleteComment, params);
        yield put({type: types.DELETE_COMMENT_SUCCESS, data:data});
        yield put({type: types.GET_POSTS, postId: params.postId});
    }catch (e){
        yield put({type:types.DELETE_COMMENT_FAILED, error:e});
    }
};
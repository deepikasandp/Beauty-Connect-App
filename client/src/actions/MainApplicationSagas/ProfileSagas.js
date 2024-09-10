import * as types from '../ActionTypes';
import * as api from '../../api';
import { call, put } from 'redux-saga/effects';
import { toastSuccess, toastFail } from '../../helper';

export function* getProfile(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }

        const data = yield call(api.getProfile, params);
        yield put({type: types.GET_PROFILE_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.GET_PROFILE_FAILED, error:e});
    }
};

export function* getAllProfiles(action) {
    // yield put({type: types.CLEAR_PROFILE});

    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }

        const data = yield call(api.getAllProfiles, params);
        yield put({type: types.GET_ALL_PROFILES_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.GET_ALL_PROFILES_FAILED, error:e});
    }
};

export function* getProfileByID(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }

        params.user_id = action.user_id;
        const data = yield call(api.getProfileByID, params);
        yield put({type: types.GET_PROFILE_BY_ID_SUCCESS, data:data});
    }catch (e){
        yield put({type:types.GET_PROFILE_BY_ID_FAILED, error:e});
    }
};

export function* createProfile(action) {
    try{
        const params = {};
        params.data = action.data;
        if(localStorage.token){
            params.token = localStorage.token;
        }

        const data = yield call(api.createProfile, params);
        yield put({type: types.CREATE_PROFILE_SUCCESS, data:data});
        yield put({type: types.GET_PROFILE});
        yield put(toastSuccess(action.edit ? 'Profile Saved' : 'Profile Created'));
    }catch (e){
        yield put(toastFail(e.message));
        yield put({type:types.CREATE_PROFILE_FAILED, error:e});
    }
};

export function* addExperience(action) {
    try{
        const params = {};
        params.data = action.data;
        if(localStorage.token){
            params.token = localStorage.token;
        }

        const data = yield call(api.addExperience, params);
        yield put({type: types.ADD_EXPERIENCE_SUCCESS, data:data});
        yield put({type: types.GET_PROFILE});
        yield put(toastSuccess('Experience Saved'));
    }catch (e){
        yield put(toastFail(e.message));
        yield put({type:types.ADD_EXPERIENCE_FAILED, error:e});
    }
};

export function* addEducation(action) {
    try{
        const params = {};
        params.data = action.data;
        if(localStorage.token){
            params.token = localStorage.token;
        }

        const data = yield call(api.addEducation, params);
        yield put({type: types.ADD_EDUCATION_SUCCESS, data:data});
        yield put({type: types.GET_PROFILE});
        yield put(toastSuccess('Education Saved'));
    }catch (e){
        yield put(toastFail(e.message));
        yield put({type:types.ADD_EDUCATION_FAILED, error:e});
    }
};

export function* deleteExperience(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.exp_id = action.exp_id;

        const data = yield call(api.deleteExperience, params);
        yield put({type: types.DELETE_EXPERIENCE_SUCCESS, data:data});
        yield put(toastSuccess('Deleted Successfully'));
    }catch (e){
        yield put({type:types.DELETE_EXPERIENCE_FAILED, error:e});
    }
};

export function* deleteEducation(action) {
    try{
        const params = {};
        if(localStorage.token){
            params.token = localStorage.token;
        }
        params.exp_id = action.exp_id;

        const data = yield call(api.deleteEducation, params);
        yield put({type: types.DELETE_EDUCATION_SUCCESS, data:data});
        yield put(toastSuccess('Deleted Successfully'));
    }catch (e){
        yield put({type:types.DELETE_EDUCATION_FAILED, error:e});
    }
};


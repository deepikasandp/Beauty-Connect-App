import * as types from '../ActionTypes';

// Load User
export function loadUser(){
    return{
        type: types.USER_AUTH
    }
};

// Register User - name, email, password
export function registerUser(data) {
    return{
        type: types.REGISTER_USER,
        data: {
            ...data
        }
    }
};

// Login User - email, password
export function loginUser(data) {
    return{
        type: types.LOGIN_USER,
        data: {
            ...data
        }
    }
};

// Logout User
export function logoutUser() {
    return{
        type: types.LOGOUT_USER
    }
};

// Delete account and profile
export function deleteAccount() {
    return{
        type: types.DELETE_ACCOUNT
    }
};

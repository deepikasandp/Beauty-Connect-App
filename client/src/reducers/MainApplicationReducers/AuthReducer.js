import{
    USER_LOADED,
    AUTH_ERROR,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    DELETE_ACCOUNT
} from '../../actions/ActionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export const AuthReducer = (state = initialState, action) => {
    // Destructuring of object
    const{type, data} = action;
    switch(type){
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: data
            };
        case REGISTER_USER_SUCCESS:
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('token', data.token);
            return{
                ...state,
                ...data,
                isAuthenticated: true,
                loading: false
            };            
        case REGISTER_USER_FAILED:
        case LOGIN_USER_FAILED:
        case AUTH_ERROR:
        case LOGOUT_USER:
        case DELETE_ACCOUNT:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
};


import{
    GET_PROFILE_SUCCESS,
    GET_PROFILE_FAILED,
    GET_ALL_PROFILES_SUCCESS,
    GET_ALL_PROFILES_FAILED,
    GET_PROFILE_BY_ID_SUCCESS,
    GET_PROFILE_BY_ID_FAILED,
    CLEAR_PROFILE,
    ADD_EXPERIENCE_SUCCESS,
    ADD_EDUCATION_SUCCESS,
    DELETE_EXPERIENCE_SUCCESS,
    DELETE_EDUCATION_SUCCESS
} from '../../actions/ActionTypes';

const initialState = {
    profile: null,
    profiles: [],
    loading: true,
    error: {}
};

export const ProfileReducer = (state = initialState, action) => {
    // Destructuring of object
    const{type, data} = action;
    
    switch(type){
        case GET_PROFILE_SUCCESS:
        case ADD_EXPERIENCE_SUCCESS:
        case ADD_EDUCATION_SUCCESS:
        case DELETE_EXPERIENCE_SUCCESS:
        case DELETE_EDUCATION_SUCCESS:
        case GET_PROFILE_BY_ID_SUCCESS:
            return{
                ...state,
                profile: data,
                loading: false,
            };            
        case GET_PROFILE_FAILED:
        case GET_ALL_PROFILES_FAILED:
        case GET_PROFILE_BY_ID_FAILED:
            return{
                ...state,
                error: data,
                loading: false,
            };
        case GET_ALL_PROFILES_SUCCESS:
            return{
                ...state,
                profiles: data,
                loading: false,
            };
        case CLEAR_PROFILE:
            return{
                ...state,
                profile: {},
                profiles: [],
                loading: false,
            };
        default:
            return state;
    }
};


import {SET_TOASTER_SUCCESS, REMOVE_TOASTER} from '../actions/ActionTypes';

export const ToastReducer = (state = [], action) => {
    switch(action.type){
        case SET_TOASTER_SUCCESS:
            return [...state, action.data];            
        case REMOVE_TOASTER:
            return state.filter(item => item.toastId !== action.data.toastId);
        default:
            return state;
    }
};
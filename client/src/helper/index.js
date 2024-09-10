import * as types from '../actions/ActionTypes';

export function generateUUID(){
    let d = new Date().getTime(); //Timestamp
    let d2 = (performance && performance.now && (performance.now * 1000)) || 0; // Time in microseconds since page load or 0 if supported
    return 'xxxxxxxx-xxxx-4xxx-xxxxxxxxxxxx'.
        replace(/[xy]/g,
            (c) => {
                let r = Math.random() * 16; // random number between 0 and 16
                if (d > 0){// use timestamp until depleted
                    r = (d + r) % 16 | 0;
                    d = Math.floor(d / 16);
                } else { // use microseconds since page-load if supported
                    r = (d2 + r) % 16 | 0;
                    d2 = Math.floor(d2 / 16);
                }
                return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
};

export const TOAST = {
    SUCCESS: 'Success',
    FAIL: 'Fail'
};

export function toastSuccess(message){
    return{
        type: types.SET_TOASTER,
        data: {
            toastMessage: message,
            toastHeader: TOAST.SUCCESS,
            toastId: generateUUID()
        }
    };
}

export function toastFail(message){
    return{
        type: types.SET_TOASTER,
        data: {
            toastMessage: message,
            toastHeader: TOAST.FAIL,
            toastId: generateUUID()
        }
    };
}
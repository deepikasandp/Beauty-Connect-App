import { combineReducers } from 'redux';
import * as ToastReducer from './ToastReducer';
import * as MainApplicationReducers from './MainApplicationReducers';

const rootReducer = combineReducers({
    ...ToastReducer,
    MainApplicationReducers: combineReducers({...MainApplicationReducers}),
});

export default rootReducer;
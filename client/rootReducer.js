import { combineReducers } from 'redux';
import auth from './auth/authreducer.js';

const rootReducer = combineReducers({
    auth
});

export default rootReducer;

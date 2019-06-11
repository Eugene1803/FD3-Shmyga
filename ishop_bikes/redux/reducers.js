import { combineReducers } from 'redux';
import bikesReducer from "./bikesReducer";
import userReducer from './userReducer';
let combinedReducer=combineReducers({
    bikes: bikesReducer, 
    userData: userReducer,
});

export default combinedReducer;

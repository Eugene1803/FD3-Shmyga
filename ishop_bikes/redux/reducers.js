import { combineReducers } from 'redux';
import bikesReducer from "./bikesReducer";
import userReducer from './userReducer';
import messageReducer from './messageReducer';
let combinedReducer=combineReducers({
    bikes: bikesReducer, 
    userData: userReducer,
    popUpMessage: messageReducer
});

export default combinedReducer;

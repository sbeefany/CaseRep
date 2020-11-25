import {createStore, combineReducers, applyMiddleware} from 'redux'
import AuthReducer from './Reducers/AuthReducer';
import thunkMiddleware from 'redux-thunk';



let reducers=combineReducers({
    AuthReducer: AuthReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));




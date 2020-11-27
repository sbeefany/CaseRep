import {createStore, combineReducers, applyMiddleware} from 'redux'
import AuthReducer from './Reducers/AuthReducer';
import AdminReducer from './Reducers/AdminReducer';
import thunkMiddleware from 'redux-thunk';



let reducers=combineReducers({
    AuthReducer: AuthReducer,
    AdminReducer:AdminReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));




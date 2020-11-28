import {createStore, combineReducers, applyMiddleware} from 'redux'
import AuthReducer from './Reducers/AuthReducer';
import AdminReducer from './Reducers/AdminReducer';
import thunkMiddleware from 'redux-thunk';
import WorkerReducer from './Reducers/WorkerReducer';



let reducers=combineReducers({
    AuthReducer: AuthReducer,
    AdminReducer:AdminReducer,
    WorkerReducer:WorkerReducer
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));




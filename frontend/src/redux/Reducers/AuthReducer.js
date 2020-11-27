import { MainAPI } from "../../API/API"

let initialState = {
    id: null,
    name: "",
    position: null,
    sallary: null,
    surename: "",
    isAuth: false,
    isFetching:false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER: {
            return { ...state, ...action.payload }
        }
        case SET_LOGIN_OUT: {
            return { ...state, id: null,name: "", position: null, sallary: null, surename: "", isAuth: false, }

        }
        case TOGGLE_FETCHING:{
            return{...state,isFetching:action.isFetching}
        }


        default:
            return state
    }
}
export default AuthReducer

const SET_AUTH_USER = 'SET_AUTH_USER'
const SET_LOGIN_OUT = 'SET_LOGIN_OUT'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'

export const setToggle = (isFetching) => {
    return ({type:TOGGLE_FETCHING,isFetching})
    }

export const SetAuthCreation = (name, id, surename,sallary,position, isAuth) => {
    return ({ type: SET_AUTH_USER, payload: {name, id, surename,sallary,position, isAuth} });
}
export const SetLogOut = () => {
    return ({ type: SET_LOGIN_OUT })
}

export const loginRequest = (login, password) =>
    async (dispatch) => {
        let response = await MainAPI.login(login, password);
            dispatch(SetAuthCreation(response.name, response.id, response.surename,response.sallary,response.position, true))
    }





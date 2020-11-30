import { MainAPI } from "../../API/API"

let initialState = {
    id: null,
    name: "",
    position: null,
    sallary: null,
    surename: "",
    isAuth: false,
    isFetching:false,
    projectId:null,
    isError:false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER: {
            return { ...state, ...action.payload }
        }
        case SET_LOGIN_OUT: {
            return { ...state, id: null,name: "", position: null, sallary: null, surename: "", isAuth: false, isError:false }

        }
        case TOGGLE_FETCHING:{
            return{...state,isFetching:action.isFetching}
        }
        case SET_ERROR:{
            return {...state, isError:true}
        }


        default:
            return state
    }
}
export default AuthReducer

const SET_AUTH_USER = 'SET_AUTH_USER'
const SET_LOGIN_OUT = 'SET_LOGIN_OUT'
const TOGGLE_FETCHING = 'TOGGLE_FETCHING'
const SET_ERROR = 'SET_ERROR'

export const setToggle = (isFetching) => {
    return ({type:TOGGLE_FETCHING,isFetching})
    }

export const SetAuthCreation = (name, id, surename,sallary,position,projectId, isAuth) => {
    return ({ type: SET_AUTH_USER, payload: {name, id, surename,sallary,position,projectId, isAuth} });
}
export const SetLogOut = () => {
    return ({ type: SET_LOGIN_OUT })
}

export const SetError = () => {
    return ({ type: SET_ERROR })
}

export const loginRequest = (login, password) =>
    async (dispatch) => {
        try{
            let response = await MainAPI.login(login, password);
            console.log(response)
            dispatch(SetAuthCreation(response.name, response.id, response.surename,response.sallary,response.position,response.projectId, true))
        }
       
        catch{
           dispatch(SetError())
        }
    }





import { MainAPI } from "../../API/API"

let initialState = {
   allProjects:[],
   isFetching:false
}

const AdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_PROJECTS: {
            return { ...state, allProjects : action.payload }
        }
        case SET_FETCHING:{
            return {...state, isFetching:action.isFetching}
        }
    
        default:
            return state
    }
}
export default AdminReducer

const SET_ALL_PROJECTS = 'SET_ALL_PROJECTS'
const SET_FETCHING = 'SET_FETCHING'

export const SetAllProjects = (payload) => {
    return ({ type: SET_ALL_PROJECTS, payload });
}

export const setFetching = (isFetching) => {
    return ({type:SET_FETCHING, isFetching})
}

export const allProjectsRequest = () =>
    async (dispatch) => {
        dispatch(setFetching(true))
        let response = await MainAPI.takeAllProjects();
            dispatch(SetAllProjects(response));
            dispatch(setFetching(false))
    }





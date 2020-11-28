import { MainAPI } from "../../API/API"

let initialState = {
   allProjects:[],
   allWorkers:[],
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
        case SET_ALL_WORKERS: {
            return { ...state, allWorkers : action.allWorkers }
        }
    
        default:
            return state
    }
}
export default AdminReducer

const SET_ALL_PROJECTS = 'SET_ALL_PROJECTS'
const SET_FETCHING = 'SET_FETCHING'
const SET_ALL_WORKERS = 'SET_ALL_WORKERS'

export const SetAllProjects = (payload) => {
    return ({ type: SET_ALL_PROJECTS, payload });
}

export const setFetching = (isFetching) => {
    return ({type:SET_FETCHING, isFetching})
}

export const setAllWorkers = (allWorkers) => {
    return ({type:SET_ALL_WORKERS, allWorkers})
}

export const allProjectsRequest = () =>
    async (dispatch) => {
        dispatch(setFetching(true))
        let response = await MainAPI.takeAllProjects();
            dispatch(SetAllProjects(response));
            dispatch(setFetching(false))
    }

    export const allWorkersRequest = () =>
    async (dispatch) => {
        dispatch(setFetching(true))
        let response = await MainAPI.takeAllWorkers();
            dispatch(setAllWorkers(response));
            dispatch(setFetching(false))
    }





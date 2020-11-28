import { MainAPI } from "../../API/API"

let initialState = {
   currentProject:{},
   isFetching:false
}

const WorkerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT: {
            return { ...state, currentProject : action.payload }
        }
        case SET_FETCHING:{
            return {...state, isFetching:action.isFetching}
        }
    
        default:
            return state
    }
}
export default WorkerReducer

const SET_PROJECT = 'SET_PROJECT'
const SET_FETCHING = 'SET_FETCHING'


export const SetProject = (payload) => {
    return ({ type: SET_PROJECT, payload });
}

export const setFetching = (isFetching) => {
    return ({type:SET_FETCHING, isFetching})
}

export const projectRequest = (id) =>
    async (dispatch) => {
        dispatch(setFetching(true))
        let response = await MainAPI.takeCurrentProject(id);
        console.log(response)
            dispatch(SetProject(response));
            dispatch(setFetching(false))
    }

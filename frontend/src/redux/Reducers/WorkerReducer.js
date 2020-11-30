import { MainAPI } from "../../API/API"

let initialState = {
   currentProject:[],
   isFetching:false,
   projectTasks:[],
   myTasks:[],
}

const WorkerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROJECT: {
            return { ...state, currentProject : action.payload }
        }
        case SET_FETCHING:{
            return {...state, isFetching:action.isFetching}
        }
        case SET_PROJECT_TASKS: {
            return { ...state, projectTasks : action.projectTasks }
        }
        case SET_MY_TASKS: {
            return { ...state, myTasks : action.myTasks }
        }
    
        default:
            return state
    }
}
export default WorkerReducer

const SET_PROJECT = 'SET_PROJECT'
const SET_FETCHING = 'SET_FETCHING'
const SET_PROJECT_TASKS = 'SET_PROJECT_TASKS'
const SET_MY_TASKS = 'SET_MY_TASKS'


export const SetProject = (payload) => {
    return ({ type: SET_PROJECT, payload });
}

export const setFetching = (isFetching) => {
    return ({type:SET_FETCHING, isFetching})
}

export const SetProjectTasks = (projectTasks) => {
    return ({ type: SET_PROJECT_TASKS, projectTasks });
}

export const SetMyTasks = (
    myTasks
) => {
    return ({ type: SET_MY_TASKS, myTasks });
}

export const getProjectTasksRequest = (id) =>
async (dispatch) => {
    dispatch(setFetching(true))
    let response = await MainAPI.getProjectTasks(id);
        dispatch(SetProjectTasks(response));
        dispatch(setFetching(false))
}

export const projectRequest = (projectId) =>
    async (dispatch) => {
        dispatch(setFetching(true))
        let response = await MainAPI.takeCurrentProject(projectId);
            dispatch(SetProject(response));
            dispatch(getProjectTasksRequest(response.id))
            dispatch(setFetching(false))        
}


export const getMyTasksRequest = (id) =>
async (dispatch) => {
    dispatch(setFetching(true))
    let response = await MainAPI.getMyTasks(id);
        dispatch(SetMyTasks(response));
        dispatch(setFetching(false))
}



import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AllProjects from '../../Projects/components/AllProjects/AllProjects';
import Project from '../../Projects/components/Project/Project';
import s from './Projects.module.css';
import {getProjectTasksRequest} from '../../redux/Reducers/WorkerReducer'


const Projects = (props) => {

    const {isFetching, getProjectTasksRequest} = props;

    const [isClickNext, setClick] = useState(-1);

    useEffect(()=>{
        if (isClickNext !==-1){
            getProjectTasksRequest(isClickNext)
        }
    },[isClickNext])

    return (
        <div className={s.container}>
            <div  className = {s.allProjectsContainer}>
            <AllProjects setClick = {setClick}/> 
            </div>
            <div className={s.projectContainer}>
            {isClickNext !== -1 ?
            isFetching ? 'Загрузка...' :
            <Project idAdmin = {isClickNext}/> :
             'Выберите проект'}
            </div>
          
        </div>
    )
}

const mapStateToProps = (state) => ({
    isFetching:state.WorkerReducer.isFetching
})
export default connect(mapStateToProps,{getProjectTasksRequest})(Projects)
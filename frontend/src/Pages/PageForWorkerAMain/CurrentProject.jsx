import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Header from '../../Projects/components/Header/Header';
import Project from '../../Projects/components/Project/Project';
import {projectRequest} from '../../redux/Reducers/WorkerReducer'
import {allWorkersRequest} from '../../redux/Reducers/AdminReducer'
import s from './CurrentProject.module.css'

const CurrentProject = (props) => {

    const {projectRequest,allWorkersRequest,isFetching} = props

    useEffect(()=>{
        projectRequest();
        allWorkersRequest();
    },[])

    console.log(isFetching)
    debugger
    return (
        <>
        {isFetching ? 'Загрука...' :
        <div className={s.container}>
            <div className={s.headerContainer}>
            <Header/>
            </div>
            <div className={s.projectContainer}>
            <Project/>
            </div>
        </div>
}
        </>
    )
}
const mapStateToProps=(state)=>({
    isFetching:state.WorkerReducer.isFetching,
})

export default connect(mapStateToProps,{projectRequest,allWorkersRequest})(CurrentProject)
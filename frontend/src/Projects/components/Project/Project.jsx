import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import s from './Project.module.css';
import {projectRequest} from '../../../redux/Reducers/WorkerReducer';

const Project = (props) => {
    const {idAdmin, allProjects,currentProject,isFetching,id,projectRequest} = props;

    useEffect(()=>{
        if (!idAdmin){
            projectRequest(id);
        }
    },[])

    const findCurrentProject = ()=> {
        if (idAdmin && JSON.stringify(allProjects) !== '[]'){
            return allProjects.find(elem=>elem.id === idAdmin)
        }
        else {
            return currentProject
        }
    }

    const curentProjectRender = findCurrentProject();

    console.log(curentProjectRender)


    return (
        <div className = {s.container}>
            <div className={s.contentContainer}>
            {isFetching ? 'Загрузка...' :
                <div className={s.contentWrapper}> 
                    <div className={s.publicInfo}>

                    </div>  
                </div>
}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    allProjects:state.AdminReducer.allProjects,
    currentProject:state.WorkerReducer.currentProject,
    isFetching:state.WorkerReducer.isFetching,
    id:state.AuthReducer.id
})

export default connect(mapStateToProps,{projectRequest})(Project)
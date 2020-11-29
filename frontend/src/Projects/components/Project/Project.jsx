import React from 'react'
import { connect } from 'react-redux';
import s from './Project.module.css';
import MainInfo from './components/MainInfo/MainInfo';
import Tasks from './components/Tasks/Tasks';

const Project = (props) => {

    const {idAdmin, allProjects,currentProject,projectTasks,myTasks,position} = props;


    
    const findCurrentProject = ()=> {
        if (idAdmin && JSON.stringify(allProjects) !== '[]'){
            return allProjects.find(elem=>elem.id === idAdmin)
        }
        else {
            return currentProject
        }
    }
    

    const curentProjectRender = findCurrentProject();


    
    return (
        <div className = {s.container}>
            <div className={s.contentContainer}>
               
                <div className={s.contentWrapper}> 
                    <div className={s.publicInfo}>
                     <MainInfo myTasks={myTasks} projectTasks={projectTasks} curentProjectRender = {curentProjectRender}/>
                    </div>  
                    {position === 3 ?
                    <div className={s.myTasks}>
                        <Tasks tasks = {myTasks} title = {'Мои задачи'}/>
                    </div>
                        : ''}
                    <div className={s.tasks}>
                        <Tasks tasks = {projectTasks} title = {'Задачи проекта'}/>
                </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    allProjects:state.AdminReducer.allProjects,
    currentProject:state.WorkerReducer.currentProject,
    id:state.AuthReducer.id,
    projectTasks:state.WorkerReducer.projectTasks,
    myTasks:state.WorkerReducer.myTasks,
    position:state.AuthReducer.position
})

export default connect(mapStateToProps)(Project)
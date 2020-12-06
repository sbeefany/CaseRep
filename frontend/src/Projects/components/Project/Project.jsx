import React, { useState } from 'react'
import { connect } from 'react-redux';
import s from './Project.module.css';
import MainInfo from './components/MainInfo/MainInfo';
import Tasks from './components/Tasks/Tasks';
import AddTask from './components/AddTask/AddTask';


const Project = (props) => {

    const {idAdmin, allProjects,currentProject,projectTasks,myTasks,position,allWorkers} = props;

    const [isAddTask, setNewTask] = useState(false);

    
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
                     <MainInfo tasks = {projectTasks} myTasks={myTasks} projectTasks={projectTasks} curentProjectRender = {curentProjectRender}/>
                    </div>  
                    {position === 3 ?
                    <div className={s.myTasks}>
                        <Tasks tasks = {myTasks} title = {'Мои задачи'}/>
                    </div>
                        : ''}
                    <div className={s.tasks + ' ' + (position!==1 && s.taskPadding)}>
                        <Tasks setNewTask={setNewTask} tasks = {projectTasks} title = {'Задачи проекта'}/>
                </div>
                </div>
            </div>
            {isAddTask ? 
            <AddTask id={curentProjectRender.id} setNewTask= {setNewTask}  allWorkers={allWorkers}/>
            :''}
       
        </div>
    )
}

const mapStateToProps = (state) => ({
    allProjects:state.AdminReducer.allProjects,
    currentProject:state.WorkerReducer.currentProject,
    id:state.AuthReducer.id,
    projectTasks:state.WorkerReducer.projectTasks,
    myTasks:state.WorkerReducer.myTasks,
    position:state.AuthReducer.position,
    allWorkers:state.AdminReducer.allWorkers
})

export default connect(mapStateToProps)(Project)
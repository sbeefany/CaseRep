import React from 'react'
import { connect } from 'react-redux';
import s from './Project.module.css';
import MainInfo from './components/MainInfo/MainInfo';
import Tasks from './components/Tasks/Tasks';

const Project = (props) => {

    const {idAdmin, allProjects,currentProject,id} = props;

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
               
                <div className={s.contentWrapper}> 
                    <div className={s.publicInfo}>
                     <MainInfo curentProjectRender={curentProjectRender}/>
                    </div>  
                    <div className={s.tasks}>
                        <Tasks tasks = {curentProjectRender.tasks}/>
                </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    allProjects:state.AdminReducer.allProjects,
    currentProject:state.WorkerReducer.currentProject,
    id:state.AuthReducer.id
})

export default connect(mapStateToProps)(Project)
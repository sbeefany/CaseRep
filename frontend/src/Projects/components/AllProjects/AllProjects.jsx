import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {allProjectsRequest, allWorkersRequest} from '../../../redux/Reducers/AdminReducer';
import {SetLogOut} from '../../../redux/Reducers/AuthReducer'
import AddProject from './AddProject/AddProject';
import s from './AllProjects.module.css'

const AllProjects = (props) => {
    const {setClick, allProjectsRequest,surename,position,name,allProjects,isFetching,SetLogOut,allWorkersRequest,allWorkers} = props;

    useEffect(()=>{
        allProjectsRequest();
        allWorkersRequest();
    },[allWorkersRequest,allProjectsRequest])

    const [isAddProject, setAddProject] = useState(false)

    return (
        <div className={s.container}>
        <div className={s.headerContainer}>
            <div className = {s.name}>
                {surename}  {name}
                <button onClick={()=>SetLogOut()} className={s.buttonExt}>Выход</button>
            </div>
            <div className = {s.position}>
               {position === 1 ? 'Управляющий' : '' } 
            </div>
        </div>
        <div className = {s.contentContainer}>
            <h2 className={s.mainTitle}>Проекты</h2> 
            {isFetching ?' Загрузка...' :
            allProjects.map((elem)=>
            <div key={elem.id} className={s.project} onClick={()=>setClick(elem.id)}>
            <div className={s.title}>
              {elem.title}
            </div>
            <div className={s.mainP}>
                Руководитель: {' '}
                {JSON.stringify(allWorkers) !== '[]' &&
                <span>
               { allWorkers.find(worker=>worker.id === elem.leaderId).name} {' '}
               { allWorkers.find(worker=>worker.id === elem.leaderId).surename}
                </span>
}
            </div>
        </div>
            )
            }
            <button onClick={()=>setAddProject(true)}>Новый проект</button>
            </div>
            
            {isAddProject &&  <AddProject setAddProject={setAddProject}/>}
           
        </div>
    )
}
const mapStateToProps = (state) => ({
    surename:state.AuthReducer.surename,
    position:state.AuthReducer.position,
    name:state.AuthReducer.name,
    allProjects:state.AdminReducer.allProjects,
    allWorkers:state.AdminReducer.allWorkers,
    isFetching:state.AdminReducer.isFetching
})

export default connect(mapStateToProps, {allProjectsRequest,SetLogOut,allWorkersRequest})(AllProjects)
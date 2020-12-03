import React, { useState } from 'react'
import { connect } from 'react-redux';
import s from './Project.module.css';
import MainInfo from './components/MainInfo/MainInfo';
import Tasks from './components/Tasks/Tasks';
import Diagramm from './components/Diagramm/Diagramm';

const Project = (props) => {

    const {idAdmin, allProjects,currentProject,projectTasks,myTasks,position,allWorkers} = props;

    const [isAddTask, setNewTask] = useState(false);

    const [isSelect, setSelect] = useState(false);

    const [workerName, setWorkerName] = useState('')

    const [title, setTitle] = useState('')

    const onChangeSetTitle= (e) => {
        setTitle(e.currentTarget.value)
    }

    const [descr, setDescr] = useState('')

    const onChangeSetDescr= (e) => {
        setDescr(e.currentTarget.value)
    }

    const [weight, setWeight] = useState('')

    const onChangeSetWeight= (e) => {
        setWeight(e.currentTarget.value)
    }

const workersForShow = allWorkers.filter(elem => elem.position === 3)
    const findCurrentProject = ()=> {
        if (idAdmin && JSON.stringify(allProjects) !== '[]'){
            return allProjects.find(elem=>elem.id === idAdmin)
        }
        else {
            return currentProject
        }
    }
    
    const handleChooseWorker = (name) => {
        setWorkerName(name)
        setSelect(false)
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
                        <Tasks setNewTask={setNewTask} tasks = {projectTasks} title = {'Задачи проекта'}/>
                </div>
                </div>
            </div>
            {isAddTask ? 
            <div className={s.addTask}>
                <div onClick={()=>setNewTask(false)} className={s.close}></div>
                <div className={s.addTaskContent}>
                    <h1 className={s.title}>Добавление задачи</h1>
                    <div className={s.content}>
                    <div>
                        <span className={s.left}>Название</span> <input placeholder={'Название'} onChange={onChangeSetTitle} value={title}/>
                    </div>
                    <div>
                        <span className={s.left}>Описание</span> <input placeholder={'Описание'} onChange={onChangeSetDescr} value={descr}/>
                    </div>
                    <div>
                        <span className={s.left}>Вес задачи</span> <input placeholder={'Вес'} onChange={onChangeSetWeight} value={weight}/>
                    </div>
                    <div className= {s.author}>
                        <span className={s.left}>Автор</span> 
                        {workerName === '' ?  <div className={s.select} onClick={()=>setSelect(!isSelect)}>Выберите сотрудика</div> :
                        <div className={s.select}  onClick={()=>setSelect(!isSelect)} >{workerName}</div>}
                        <div className={s.selector}>
                        {isSelect && workersForShow.map((elem)=>{
                            return <div className={s.select1} onClick={()=>handleChooseWorker(elem.surename+ ' ' + elem.name)}>{elem.surename + ' ' + elem.name}</div>
                        })}
                        </div>
                    </div>
                    <button className={s.addBtn}>Добавить</button>
                    </div>
                </div>
            </div>
        :''}
        <Diagramm  tasks = {projectTasks}/>
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
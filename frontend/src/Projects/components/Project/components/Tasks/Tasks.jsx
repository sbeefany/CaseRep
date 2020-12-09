import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import s from './Tasks.module.css';
import edit from '../../../../../img/edit.jpg';
import deleteImg from '../../../../../img/delete.png'
import {updateTask,getProjectTasksRequest,getMyTasksRequest,deleteTask} from '../../../../../redux/Reducers/WorkerReducer'

const Tasks = (props) => {

    const { tasks, allWorkers,title,position,setNewTask,updateTask,projectId,getProjectTasksRequest,deleteTask,getMyTasksRequest } = props;

    const [isEditMode, setEditMode] = useState(-1);

    const [newTitle, setTitle] = useState(-1);

    const setNewTitle = (e) => {
        setTitle(e.currentTarget.value)
    }

    const [newTheEndDate, setTheEndDate] = useState(-1);
    
    const setNewTheEndDate = (e) => {
        setTheEndDate(e.currentTarget.value)
    }

    const [newWeight, setWeight] = useState(-1);

    const setNewWeight = (e) => {
        setWeight(e.currentTarget.value)
    }

    const [newStatus, setStatus] = useState(-1);
    
    const setNewStatus = (e) => {
        setStatus(e.currentTarget.value === 'Выполнено' ? 1 : 0)
    }


    const handleUpdateTask = (projectId,id,newTitle,newTheEndDate,newStatus,newWeight,authorId)=> {
        let data = {};
        if (newTitle !==-1){
            data.title = newTitle
        }
        if (newTheEndDate !==-1){
            data.theEndDate = newTheEndDate
        }
        if (newStatus !== -1){
            data.status = newStatus
        }
        if (newWeight !== -1){
            data.weight = +newWeight
        }
        if (position===2){
            updateTask(id, data ).then(()=> getProjectTasksRequest(projectId))
            setStatus(-1)
            setTheEndDate(-1)
            setWeight(-1)
            setTitle(-1)
            setEditMode(-1)
        }
        else {
            updateTask(id, data ).then(()=> getMyTasksRequest(authorId))
            setStatus(-1)
            setTheEndDate(-1)
            setWeight(-1)
            setTitle(-1)
            setEditMode(-1)
        }
    }

    const handleDeleteTask = (id, projectId) => {
        deleteTask(id).then(()=>getProjectTasksRequest(projectId))
    }

    return (
        <>
            <div className={s.header}>
                <h1 className={s.title}>{title}</h1>
                {title === 'Задачи проекта' && position === 2 ? 
                <button onClick={()=>setNewTask(true)}>Создать</button>
                    : ''}
            </div>
            <div className={s.scroll}>
            <table className={s.table}>
                <thead>
                    <tr>
                        <td className={s.td1}>№</td>
                        <td className={s.td2}>Название</td>
                        <td className={s.td3}>Статус</td>
                        <td className={s.td3}>Выполнить до</td>
                        <td className={s.td3}>Исполнитель</td>
                        <td className={s.td3}>Баллы</td>
                        <td className={s.td4}></td>
                        <td className={s.td4}></td>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((elem, key) => {
                        return (
                            <tr className={s.tr}>
                                <td className={s.td1}>{key + 1}</td>
                                <td className={s.td2}> {isEditMode === elem.id && position===2 ? <input className={s.input} onChange={setNewTitle} value={newTitle === -1 ? elem.title: newTitle}/>:elem.title}</td>
                                <td className={s.td3}>{isEditMode === elem.id ? <select onChange={setNewStatus}><option selected="true" disabled="disabled">Выберите статус</option><option>Выполнено</option><option> Не выполнено</option></select> : elem.status === 1 ? 'Выполнено' : 'Не выполнено'}</td>
                                <td className={s.td3}>{isEditMode === elem.id && position===2 ? <input onChange={setNewTheEndDate} className={s.input} value={newTheEndDate === -1 ?  elem.theEndDate.slice(0,10): newTheEndDate}/> : elem.theEndDate.slice(0,10)}</td>
                                <td className={s.td3}>{allWorkers.find(worker => worker.id === +elem.authorId).name} {' '}
                                    {allWorkers.find(worker => worker.id === +elem.authorId).surename}</td>
                                <td className={s.td3}>{isEditMode  === elem.id && position===2 ? <input className={s.input} onChange={setNewWeight} value={newWeight === -1 ? elem.weight: newWeight}/> : elem.weight}</td>
                        <td className={s.td4}>{((title === 'Мои задачи' && position === 3) || (title ==='Задачи проекта' && position===2)) ?
                          isEditMode === elem.id ? 
                         <div onClick={()=>handleUpdateTask(projectId,elem.id,newTitle,newTheEndDate,newStatus,newWeight,elem.authorId)}>Сохр</div>:<img onClick={()=>setEditMode(elem.id)} className={s.editImg} alt={''} src={edit}/> : ''}</td>
                                <td className={s.td4}>{(title ==='Задачи проекта' && position===2) &&
                          <img onClick={()=>handleDeleteTask(elem.id, projectId)} className={s.editImg} src={deleteImg} alt={''}/>}</td>
                            </tr>)
                    })}
                </tbody>
            </table>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    allWorkers: state.AdminReducer.allWorkers,
    position:state.AuthReducer.position
})

export default connect(mapStateToProps, {updateTask,getProjectTasksRequest,getMyTasksRequest,deleteTask})(Tasks)
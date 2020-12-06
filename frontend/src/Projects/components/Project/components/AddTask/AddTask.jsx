import React, { useState } from 'react'
import s from '../../Project.module.css'
import {createTask,getProjectTasksRequest} from '../../../../../redux/Reducers/WorkerReducer'
import { connect } from 'react-redux';

const AddTask = ({allWorkers,setNewTask,createTask,id,getProjectTasksRequest}) => {
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

    const [error, setError] = useState(false)
    
    const [date, setDate] = useState('')

    const onChangeSetDate= (e) => {
        setDate(e.currentTarget.value)
    }


    
    const handleChooseWorker = (name) => {
        setWorkerName(name)
        setSelect(false)
    }

    const workersForShow = allWorkers.filter(elem => elem.position === 3)


    const createNewTask=(title,descr, date, weight, workerName) => {
        if (title!=='' && descr!=='' && date!=='' && weight!=='' && workerName!==''){
            createTask({title:title, discription:descr,
            weight:weight, 
            authorId:allWorkers.find(elem=>elem.name === workerName.split(' ')[1] && elem.surename === workerName.split(' ')[0]).id, 
            status:0, projectId:id, 
            theBeginingDate:new Date(), theEndDate:date}).then(()=>getProjectTasksRequest(id))
            setNewTask(false);
        }
        else {
            setError(true)
        }
    }

    const handleClose = () => {
        setNewTask(false);
        setError(false)
    }
    
    return (
        <div className={s.addTask}>
                <div onClick={()=>handleClose()} className={s.close}></div>
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
                        <span className={s.left}>Дата </span> <input placeholder={'Дата окончания'} onChange={onChangeSetDate} value={date}/>
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
                    {error && <div className={s.error}>Заполните все поля</div>}
                    <button className={s.addBtn} onClick={()=>createNewTask(title,descr, date, weight, workerName)}>Добавить</button>
                    </div>
                </div>
            </div>
        
    )
}

const mapStateToProps=(state)=> ({

})

export default connect(mapStateToProps , {createTask,getProjectTasksRequest})(AddTask)
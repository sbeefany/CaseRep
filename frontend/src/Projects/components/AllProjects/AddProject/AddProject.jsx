import React, { useState } from 'react'
import s from './AddProjects.module.css'
import { connect } from 'react-redux';
import {createProjectReq,allProjectsRequest} from '../../../../redux/Reducers/AdminReducer'

const AddProject = ({setAddProject,allWorkers,createProjectReq,allProjectsRequest}) => {
    const [isSelect, setSelect] = useState(false);

    const [workerName, setWorkerName] = useState('')

    const [adminId, setAdminId] = useState(null)
    const [workerIds, setWorkersIds] = useState([])

    const setWorkers = (id) => {
        if (workerIds.indexOf(id) === -1){
            setWorkersIds([...workerIds, id])
        }
        else {
            let arr = workerIds.filter(elem=> elem !== id)
            setWorkersIds([...arr])
        }
    }

    const [title, setTitle] = useState('')

    const onChangeSetTitle= (e) => {
        setTitle(e.currentTarget.value)
    }

    const [cost, setCost] = useState('')

    const onChangeSetCost= (e) => {
        setCost(e.currentTarget.value)
    }

    const [error, setError] = useState(false)
    
    const [date, setDate] = useState('')

    const onChangeSetDate= (e) => {
        setDate(e.currentTarget.value)
    }

    const handleClickSend = (title, adminId, theBeginingDate, theEndDate,costs, workerIds) => {
        let data = {
            title:title,
            leaderId:adminId,
            theBeginingDate:theBeginingDate,
            theEndDate:theEndDate,
            costs:costs
        }
        let workers = [...workerIds,adminId]
        createProjectReq(data,workers).then(()=>allProjectsRequest())
        setAddProject(false)
    }

    
    const handleChooseWorker = (name,id) => {
        setWorkerName(name);
        setAdminId(id)
        setSelect(false)
    }



    
    const handleClose = () => {
        setError(false)
        setAddProject(false)
    }

    const adminsForShow = allWorkers.filter(elem => elem.position === 2 && elem.projectId===-2);
    const workersForShow = allWorkers.filter(elem => elem.position === 3 && elem.projectId===-2);

    
    return (
        <div className={s.addProject}>
                <div onClick={()=>handleClose()} className={s.close}></div>
                <div className={s.addTaskContent}>
                    <h1 className={s.title}>Добавление проекта</h1>
                    <div className={s.content}>
                    <div>
                        <span className={s.left}>Название</span> <input className={s.inputs} placeholder={'Название'} onChange={onChangeSetTitle} value={title}/>
                    </div>
                    <div>
                        <span className={s.left}>Дата </span> <input className={s.inputs} placeholder={'Дата окончания'} onChange={onChangeSetDate} value={date}/>
                    </div>
                    
                    <div className= {s.author}>
                        <span className={s.left}>Руководитель</span> 
                        {workerName === '' ?  <div className={s.select} onClick={()=>setSelect(!isSelect)}>Выберите руководителя</div> :
                        <div className={s.select}  onClick={()=>setSelect(!isSelect)} >{workerName}</div>}
                        <div className={s.selector}>
                        {isSelect && adminsForShow.map((elem)=>{
                            return <div className={s.select1} onClick={()=>handleChooseWorker(elem.surename + ' ' + elem.name,elem.id)}>{elem.surename + ' ' + elem.name}</div>
                        })}
                        </div>
                    </div>
                    <div className={s.workers}>
                        <span className={s.left}>Сотрудники</span> 
                        <div className={s.checkboxWrapper}>
                        {workersForShow.map(elem=>{
                            return <div className={s.checkboxContainer}>
                                 <input className={s.checkbox} onChange={() => setWorkers(elem.id)} type="checkbox" checked={!!(workerIds.indexOf(elem.id) !== -1)} />
                            <label>{elem.surename + ' ' + elem.name}</label>
                           
                          </div> 
                        })}
                        </div>
                    </div>
                    <div>
                        <span className={s.left}>Стоимость проекта</span> <input className={s.inputs} placeholder={'Стоимость'} onChange={onChangeSetCost} value={cost}/>
                    </div>
                   
                    {error && <div className={s.error}>Заполните все поля</div>}
                    <button onClick={()=>handleClickSend(title,adminId, String(new Date()).slice(0,11),date,cost, workerIds)} className={s.addBtn}>Добавить</button>
                    </div>
                </div>
            </div>
        
    )
}

const mapStateToProps=(state)=> ({
    allWorkers:state.AdminReducer.allWorkers
})

export default connect(mapStateToProps , {createProjectReq,allProjectsRequest})(AddProject)
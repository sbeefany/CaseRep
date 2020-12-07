import React, { useState } from 'react'
import s from './AddProjects.module.css'
import { connect } from 'react-redux';

const AddProject = ({setAddProject,allWorkers}) => {
    const [isSelect, setSelect] = useState(false);

    const [workerName, setWorkerName] = useState('')

    const [workerNames, setWorkerNames] = useState([])

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


    
    const handleChooseWorker = (name) => {
        setWorkerName(name)
        setSelect(false)
    }



    
    const handleClose = () => {
        setError(false)
        setAddProject(false)
    }

    const adminsForShow = allWorkers.filter(elem => elem.position === 2 && elem.projectId===-1);
    const workersForShow = allWorkers.filter(elem => elem.position === 3 && elem.projectId===-1);
    
    return (
        <div className={s.addProject}>
                <div onClick={()=>handleClose()} className={s.close}></div>
                <div className={s.addTaskContent}>
                    <h1 className={s.title}>Добавление проекта</h1>
                    <div className={s.content}>
                    <div>
                        <span className={s.left}>Название</span> <input placeholder={'Название'} onChange={onChangeSetTitle} value={title}/>
                    </div>
                    <div>
                        <span className={s.left}>Дата </span> <input placeholder={'Дата окончания'} onChange={onChangeSetDate} value={date}/>
                    </div>
                    
                    <div className= {s.author}>
                        <span className={s.left}>Руководитель</span> 
                        {workerName === '' ?  <div className={s.select} onClick={()=>setSelect(!isSelect)}>Выберите руководителя</div> :
                        <div className={s.select}  onClick={()=>setSelect(!isSelect)} >{workerName}</div>}
                        <div className={s.selector}>
                        {isSelect && adminsForShow.map((elem)=>{
                            return <div className={s.select1} onClick={()=>handleChooseWorker(elem.surename+ ' ' + elem.name)}>{elem.surename + ' ' + elem.name}</div>
                        })}
                        </div>
                    </div>
                    <div className= {s.author}>
                        <span className={s.left}>Сотрудники</span> 
                        {workerNames === '' ?  <div className={s.select} onClick={()=>setSelect(!isSelect)}>Выберите сотрудиков</div> :
                        <div className={s.select}  onClick={()=>setSelect(!isSelect)} >{workerNames.map(elem=>elem)}</div>}
                        <div className={s.selector}>
                        {isSelect && workersForShow.map((elem)=>{
                            return <div className={s.select1} onClick={()=>handleChooseWorkers(elem.surename+ ' ' + elem.name)}>{elem.surename + ' ' + elem.name}</div>
                        })}
                        </div>
                    </div>
                    <div>
                        <span className={s.left}>Стоимость проекта</span> <input placeholder={'Стоимость'} onChange={onChangeSetCost} value={cost}/>
                    </div>
                   
                    {error && <div className={s.error}>Заполните все поля</div>}
                    <button className={s.addBtn}>Добавить</button>
                    </div>
                </div>
            </div>
        
    )
}

const mapStateToProps=(state)=> ({
    allWorkers:state.WorkerReducer.allWorkers
})

export default connect(mapStateToProps , {})(AddProject)
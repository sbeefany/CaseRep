import React, { useState } from 'react'
import { connect } from 'react-redux';
import s from './Tasks.module.css';
import edit from '../../../../../img/edit.jpg'

const Tasks = (props) => {

    const { tasks, allWorkers,title,position,setNewTask } = props;

    const [isEditMode, setEditMode] = useState(-1)

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
                                <td className={s.td2}> {isEditMode === elem.id && position==2 ? <input className={s.input} value={elem.title}/>:elem.title}</td>
                                <td className={s.td3}>{isEditMode === elem.id ? <select><option>Выполнено</option><option> Не выполнено</option></select> : elem.status === 1 ? 'Выполнено' : 'Не выполнено'}</td>
                                <td className={s.td3}>{isEditMode === elem.id && position==2 ? <input className={s.input} value={elem.theEndDate.slice(0,10)}/> : elem.theEndDate.slice(0,10)}</td>
                                <td className={s.td3}>{allWorkers.find(worker => worker.id === +elem.authorId).name} {' '}
                                    {allWorkers.find(worker => worker.id === +elem.authorId).surename}</td>
                                <td className={s.td3}>{isEditMode  === elem.id && position===2 ? <input className={s.input} value={elem.weight}/> : elem.weight}</td>
                        <td className={s.td4}>{((title === 'Мои задачи' && position === 3) || (title ==='Задачи проекта' && position===2)) ?
                          isEditMode === -1 ? 
                        <img onClick={()=>setEditMode(elem.id)} className={s.editImg} src={edit}/>: <div onClick={()=>setEditMode(-1)}>Сохр</div> : ''}</td>
                                <td className={s.td4}></td>
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

export default connect(mapStateToProps)(Tasks)
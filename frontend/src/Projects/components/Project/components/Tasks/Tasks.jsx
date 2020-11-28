import React from 'react'
import { connect } from 'react-redux';
import s from './Tasks.module.css'

const Tasks = (props) => {

    const { tasks, allWorkers } = props;

    return (
        <div>
            <div className={s.header}>
                <h1 className={s.title}>Задачи проекта</h1>
                <button>Создать</button>
            </div>
            <table className={s.table}>
                <thead>
                    <tr>
                        <td className={s.td1}>№</td>
                        <td className={s.td2}>Название</td>
                        <td className={s.td3}>Статус</td>
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
                                <td className={s.td2}>{elem.title}</td>
                                <td className={s.td3}>{elem.status === 1 ? 'Выполнено' : 'Не выполнено'}</td>
                                <td className={s.td3}>{allWorkers.find(worker => worker.id === +elem.author).name} {' '}
                                    {allWorkers.find(worker => worker.id === +elem.author).surename}</td>
                                <td className={s.td3}>{elem.weight}</td>
                                <td className={s.td4}></td>
                                <td className={s.td4}></td>
                            </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => ({
    allWorkers: state.AdminReducer.allWorkers,
})

export default connect(mapStateToProps)(Tasks)
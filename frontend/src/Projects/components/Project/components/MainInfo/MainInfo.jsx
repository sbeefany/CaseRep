import React from 'react'
import { connect } from 'react-redux'
import Diagramm from '../Diagramm/Diagramm'
import s from './MainInfo.module.css'

const MainInfo = ({curentProjectRender,allWorkers,position,tasks,myTasks,projectTasks}) => {

    return (
        <div className={s.container}>
            <div className={s.infoContainer}>
            <h1 className={s.title}>Общая информация</h1>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Название проекта:</td>
                                    <td>{curentProjectRender.title}</td>
                                </tr>
                                <tr>
                                    <td>Руководитель:</td>
                                    <td>{allWorkers.find((elem)=>elem.id === curentProjectRender.leaderId).name} {' '}
                                    {allWorkers.find((elem)=>elem.id === curentProjectRender.leaderId).surename}</td>
                                </tr>
                                <tr>
                                    <td>Дата начала проекта:</td>
                                    <td>{curentProjectRender.theBeginingDate.slice(0,10)}</td>
                                </tr>
                                <tr>
                                    <td>Дата окончания проекта:</td>
                                    <td>{curentProjectRender.theEndDate.slice(0,10)}</td>
                                </tr>
                                <tr>
                                <td>Стоимость проекта:</td>
                                <td>{curentProjectRender.costs} руб</td>
                                </tr>
                        
                                {position !== 1 ?
                                position === 2 ?
                                <tr>
                                    <td>Моя процентная доля:</td>
                                    <td>20% от стоимости проекта({curentProjectRender.costs * 0.8} руб)</td>
                                </tr>
                                : 
                                <tr>
                                    <td>Моя процентная доля</td>
                                    <td>{Math.floor(myTasks.reduce((previousValue,currentValue)=>{return +previousValue + +currentValue.weight},0)/
                                     projectTasks.reduce((previousValue,currentValue)=>{return +previousValue + +currentValue.weight},0)*0.8 * 100)}%</td>
                                </tr>
                                : ''}
                            </tbody>
                        </table>
                        </div>
                        <div className={s.sallaryContainer}>
                            {position === 3 ? 
                                       <div> Мои баллы: {myTasks.reduce((previousValue,currentValue)=>{return +previousValue + +currentValue.weight},0)} {' '}
                                       из {projectTasks.reduce((previousValue,currentValue)=>{return +previousValue + +currentValue.weight},0)}
                                       </div>
                            :''}
                            {position !==3 &&   <div className={s.diagramm}> <Diagramm  tasks = {projectTasks}/> </div> }
                            <div className={position !== 3 && s.opacity}>Мое текущее вознаграждение по окончанию проекта: <br/> {
                            position === 3 ?
                             Math.floor((curentProjectRender.costs*0.8)/
                             projectTasks.reduce((previousValue,currentValue)=>{return +previousValue + +currentValue.weight},0)*
                             myTasks.reduce((previousValue,currentValue)=>{return +previousValue + +currentValue.weight},0)) + ' ' + 'руб': ''}</div> 
                             {position === 3 &&
                            <div> На данный момент один балл =  {Math.floor((curentProjectRender.costs*0.8)/
                             projectTasks.reduce((previousValue,currentValue)=>{return +previousValue + +currentValue.weight},0))} руб </div>}
                        </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    allWorkers:state.AdminReducer.allWorkers,
    position:state.AuthReducer.position,
    sallary:state.AuthReducer.sallary
})

export default connect(mapStateToProps,{})(MainInfo)
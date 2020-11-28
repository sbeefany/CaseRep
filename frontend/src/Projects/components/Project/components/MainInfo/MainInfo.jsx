import React from 'react'
import { connect } from 'react-redux'
import s from './MainInfo.module.css'

const MainInfo = ({curentProjectRender,allWorkers,position,sallary}) => {
    return (
        <>
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
                                <td>{curentProjectRender.costs}</td>
                                </tr>
                                {position !== 1 ?
                                <tr>
                                    <td>Моя процентная доля</td>
                                    <td>{sallary}</td>
                                </tr>
                                : ''}
                            </tbody>
                        </table>
        </>
    )
}

const mapStateToProps = (state) => ({
    allWorkers:state.AdminReducer.allWorkers,
    position:state.AuthReducer.position,
    sallary:state.AuthReducer.sallary
})

export default connect(mapStateToProps,{})(MainInfo)
import React from 'react'
import Header from '../../Projects/components/Header/Header'
import Project from '../../Projects/components/Project/Project';
import s from './CurrentProject.module.css'

const CurrentProject = () => {
    return (
        <div className={s.container}>
            <div className={s.headerContainer}>
            <Header/>
            </div>
            <div className={s.projectContainer}>
            <Project/>
            </div>
        </div>
    )
}

export default CurrentProject
import React, { useState } from 'react'
import Header from '../../Projects/components/Header/Header';
import Project from '../../Projects/components/Project/Project';
import s from './CurrentProject.module.css'

const CurrentProject = () => {

    const [time, setTime] = useState(0)

    setTimeout(()=>setTime(1), 200)
    return (
        <div className={s.container}>
            <div className={s.headerContainer}>
            <Header/>
            </div>
            <div className={s.projectContainer}>
                {time===0 ? 'Загрузка...' :
                
            <Project/>
    }
            </div>
        </div>
    )
}


export default CurrentProject
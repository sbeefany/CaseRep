import React, { useState } from 'react';
import AllProjects from '../../Projects/components/AllProjects/AllProjects';
import Project from '../../Projects/components/Project/Project';
import s from './Projects.module.css'


const Projects = () => {

    const [isClickNext, setClick] = useState(-1)
    return (
        <div className={s.container}>
            <div  className = {s.allProjectsContainer}>
            <AllProjects setClick = {setClick}/> 
            </div>
            <div className={s.projectContainer}>
            {isClickNext !== -1 ?
            <Project idAdmin = {isClickNext}/> :
             'Выберите проект'}
            </div>
          
        </div>
    )
}
export default Projects
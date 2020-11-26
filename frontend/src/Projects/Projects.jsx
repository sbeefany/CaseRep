import React, { useState } from 'react';
import AllProjects from './components/AllProjects/AllProjects';
import Project from './components/Project/Project';
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
            <Project id = {isClickNext}/> :
             'Выберите проект'}
            </div>
          
        </div>
    )
}
export default Projects
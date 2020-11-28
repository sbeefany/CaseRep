import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import s from './Project.module.css';
import MainInfo from './components/MainInfo';

const Project = (props) => {
    const {idAdmin, allProjects,currentProject,id,isFetching} = props;

    const findCurrentProject = ()=> {
        if (idAdmin && JSON.stringify(allProjects) !== '[]'){
            return allProjects.find(elem=>elem.id === idAdmin)
        }
        else {
            return currentProject
        }
    }
    debugger

    const curentProjectRender = findCurrentProject();

    console.log(curentProjectRender)


    return (
        <div className = {s.container}>
            <div className={s.contentContainer}>
                {isFetching===true  ? 'Загрузка...' :
                <div className={s.contentWrapper}> 
                    <div className={s.publicInfo}>
                       <MainInfo curentProjectRender={curentProjectRender} />
                    </div>  
                </div>
}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    allProjects:state.AdminReducer.allProjects,
    currentProject:state.WorkerReducer.currentProject,
    id:state.AuthReducer.id,
    isFetching:state.WorkerReducer.isFetching,
  
})

export default connect(mapStateToProps,{})(Project)
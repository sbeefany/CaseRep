import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {allProjectsRequest} from '../../../redux/Reducers/AdminReducer';
import s from './AllProjects.module.css'

const AllProjects = (props) => {
    const {setClick, allProjectsRequest,surename,position,name,allProjects,isFetching} = props;

    useEffect(()=>{
        allProjectsRequest()
    },[])

    return (
        <div className={s.container}>
        <div className={s.headerContainer}>
            <div className = {s.name}>
                {surename}  {name}
            </div>
            <div className = {s.position}>
               {position === 1 ? 'Управляющий' : '' } 
            </div>
        </div>
        <div className = {s.contentContainer}>
            <h2 className={s.mainTitle}>Проекты</h2> 
            {isFetching ?' Загрузка...' :
            allProjects.map((elem)=>
            <div className={s.project} onClick={()=>setClick(elem.id)}>
            <div className={s.title}>
              {elem.title}
            </div>
            <div className={s.mainP}>
                Руководитель
            </div>
        </div>
            )
            }
            </div>
        </div>
    )
}
const mapStateToProps = (state) => ({
    surename:state.AuthReducer.surename,
    position:state.AuthReducer.position,
    name:state.AuthReducer.name,
    allProjects:state.AdminReducer.allProjects,
    isFetching:state.AdminReducer.isFetching
})

export default connect(mapStateToProps, {allProjectsRequest})(AllProjects)
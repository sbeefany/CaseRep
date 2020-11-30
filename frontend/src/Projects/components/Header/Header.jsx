import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import s from './Header.module.css';
import {projectRequest,getMyTasksRequest} from '../../../redux/Reducers/WorkerReducer';
import {allWorkersRequest} from '../../../redux/Reducers/AdminReducer';
import {SetLogOut} from '../../../redux/Reducers/AuthReducer'

const Header = (props) => {

    const {projectRequest,allWorkersRequest,name,surename,position,SetLogOut,getMyTasksRequest,id,projectId} = props;

    useEffect(()=>{
            projectRequest(projectId);
            allWorkersRequest();
            getMyTasksRequest(id)
    },[allWorkersRequest,projectRequest,getMyTasksRequest,id])
    return (
        <div className = {s.container}>
             <div>
            <div className = {s.name}>
                {surename}  {name}
            </div>
            <div className = {s.position}>
               {position === 2 ? 'Руководитель' : 'Сотрудник' } 
            </div>
            </div>
            <button onClick={()=>SetLogOut()} className={s.buttonExt}>Выход</button>
        </div>
    )
}
const mapStateToProps = (state) => ({
    name:state.AuthReducer.name,
    surename:state.AuthReducer.surename,
    position:state.AuthReducer.position,
    id:state.AuthReducer.id,
    projectId:state.AuthReducer.projectId
})
export default connect(mapStateToProps, {allWorkersRequest, projectRequest,SetLogOut,getMyTasksRequest}) (Header)
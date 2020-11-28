import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import s from './Header.module.css';
import {projectRequest} from '../../../redux/Reducers/WorkerReducer';
import {allWorkersRequest} from '../../../redux/Reducers/AdminReducer';
import {SetLogOut} from '../../../redux/Reducers/AuthReducer'

const Header = (props) => {

    const {projectRequest,allWorkersRequest,name,surename,position,SetLogOut} = props;

    useEffect(()=>{
            projectRequest();
            allWorkersRequest();
    },[allWorkersRequest,projectRequest])
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
    position:state.AuthReducer.position
})
export default connect(mapStateToProps, {allWorkersRequest, projectRequest,SetLogOut}) (Header)
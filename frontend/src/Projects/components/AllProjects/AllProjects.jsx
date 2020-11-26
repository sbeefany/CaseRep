import React from 'react'

const AllProjects = (props) => {
    const {setClick} = props
    return (
        <div>
            Все проекты
            <button onClick={()=>setClick(2)}>Перейти на проект</button>
        </div>
    )
}

export default AllProjects
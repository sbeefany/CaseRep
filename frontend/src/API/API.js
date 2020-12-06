import * as axios from 'axios';


export const MainAPI = {
  login(login, password) {
     const body =  {
         "login":login,
         "password":password
     } 
    return axios.post(`http://localhost:9000/authorization`, body)
      .then(response => {   
        return response.data
      })
  },
  takeAllProjects(){
    return axios.get(`http://localhost:9000/projects`)
      .then(response => {
        return response.data
      })
  },
  takeAllWorkers(){
    return axios.get(`http://localhost:9000/workers`)
      .then(response => {
        return response.data
      })
  },
  takeCurrentProject(projectId){
    return axios.get(`http://localhost:9000/projects/${projectId}`)
      .then(response => {
        return response.data
      })
  },
  getProjectTasks(id){
    return axios.get(`http://localhost:9000/projects/${id}/tasks`)
      .then(response => {
        return response.data
      })
  },
  getMyTasks(id){
    return axios.get(`http://localhost:9000/workers/${id}/tasks`)
      .then(response => {
        return response.data
      })
  },
  createTask(data){
    return axios.post(`http://localhost:9000/tasks`, data)
      .then(response => {
        return response.data
      })
  },
}
 
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
  }
}
 
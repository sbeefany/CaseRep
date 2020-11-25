const createError = require('http-errors')
const HTTPStatuses = require('statuses')

class Worker {
    constructor (id, name, surename, login, password, position, sallary) {
      this.id = id
      this.name = name
      this.surename = surename
      this.login = login
      this.password = password
      this.position = position
      this.sallary = sallary
    }
  }
  
  class Project {
      constructor (id, title, workers, tasks) {
          this.id = id
          this.title = title
          this.tasks = tasks
          this.workers = workers
      }
  }
  
  class Task {
      constructor (id, title, discription, weight,author,status) {
          this.id = id
          this.title = title
          this.discription = discription
          this.weight = weight
          this.author = author
          this.status = status
      }
  }
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

  function randomId(){
    return Math.random().toString(36).substr(2,9)
}
const mockWorkers = [new Worker("1","Vlada","Aleksenko","Vlada","Vlada","Системный аналитик",0),
new Worker("2","Egor","Alexandrov","Egor","Egor","Разработчик",0),
new Worker("3","Eduard","Pahomov","Eduard","Eduard","Проектировщик БД",0),
new Worker("4","Sasha","Blinov","Sasha","Sasha","Менеджер",1000)]

const mockTasks=[new Task(randomId(),"Title","HERE THERE IS A LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG DISCRIPTION",100,3)]

const mockProjects = [new Project(randomId(),"ProjectTitle",mockWorkers,mockTasks)]

app.use(bodyParser.json())

//Получение все проектов
app.get("/projects", (req,res) =>res.json(mockProjects))
//Получение конкретного проекта
app.get("/projects/:id", (req,res) =>{
var project = mockProjects.find(project => project.id===req.params.id)
res.json(project)
})
//Получение всех работников
app.get("/workers", (req,res) =>res.json(mockWorkers))
//Получение конкретного работника
app.get("/workers/:id", (req,res) =>{
    var worker = mockWorkers.find(worker => worker.id===req.params.id)
    res.json(worker)
})
//Получение всех задач
app.get("/tasks", (req,res) =>res.json(mockTasks))
//Получение конкретной задачи
app.get("/tska/:id", (req,res) =>{
    var task = mockTasks.find(task=>task.id===req.params.id)
    res.json(task)
})

//Добавление проекта
app.post("/projects",(req,res) => {
    console.log(req.body)
    mockProjects.push(req.body)
    
    res.json(mockProjects)
})
//Регистрация
app.post("/registration",(req,res) => {
    console.log(req.body)
    mockWorkers.push(req.body)
    
    res.json(mockWorkers)
})
//Добавление задания
app.post("/tasks",(req,res) => {
    console.log(req.body)
    mockTasks.push(req.body)
    
    res.json(mockTasks)
})
//Авторизация
app.post("/authorization", (req,res)=>{
    console.log(req.body)
    
    var worker = mockWorkers.find(worker=>worker.login ==="Vlada")
    console.log(worker)
    if(worker ===undefined){
        throw createError(400,'User was not found')
    }
    if(worker.password===req.body.password){
        res.json(worker)
    }else{
        throw createError(400,'password is wrong')
    }
      
})

app.listen(3000)



const createError = require('http-errors')
const HTTPStatuses = require('statuses')
var cors = require('cors')

//Позиция 1-Управляющий 2- Руководитель 3-Сотрудник
class Worker {
    constructor (id, name, surename, login, password, position, sallary, projectId) {
      this.id = id
      this.name = name
      this.surename = surename
      this.login = login
      this.password = password
      this.position = position
      this.sallary = sallary
      this.projectId = projectId
    }
  }
  
  class Project {
      constructor (id, title,leaderId,theBeginingDate,theEndDate,costs) {
          this.id = id
          this.title = title
          this.leaderId=leaderId
          this.theBeginingDate=theBeginingDate
          this.theEndDate=theEndDate
          this.costs=costs
      }
  }
  //1- СОЗДАНО 2- ЗАВЕРШЕНО 
  class Task {
      constructor (id, title, discription, weight,authorId,status,projectId) {
          this.id = id
          this.title = title
          this.discription = discription
          this.weight = weight
          this.authorId = authorId
          this.status = status
          this.projectId = projectId
      }
  }
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())

const mockTasks=[new Task(123,"Title","HERE THERE IS A LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG DISCRIPTION",100,2,1,222),
new Task(124,"Title","HERE THERE IS A small DISCRIPTION",120,2,1,222),
new Task(125,"Title2","HERE THERE IS A DISCRIPTION",20,3,1,222),
new Task(126,"Title3"," REGOR RIS RLOH",10,3,1,222),
new Task(127,"Title4","mOCK PROJECT",90,5,2,223),
new Task(128,"Title3"," REGOR RIS RLOH",10,6,2,223),
new Task(129,"Title4","mOCK PROJECT",90,6,2,223),
new Task(130,"Title3"," REGOR RIS RLOH",10,5,1,223),
new Task(131,"Title4","mOCK PROJECT",90,5,1,223),
new Task(132,"Title3"," REGOR RIS RLOH",10,7,2,224),
new Task(133,"Title4","mOCK PROJECT",90,7,1,224),
new Task(134,"Title3"," REGOR RIS RLOH",10,7,1,224),
new Task(135,"Title4","mOCK PROJECT",90,8,2,224),
new Task(136,"Title4","mOCK PROJECT",90,8,1,224),
new Task(137,"Title3"," REGOR RIS RLOH",10,9,2,224),
new Task(138,"Title4","mOCK PROJECT",90,7,1,224),
new Task(139,"Title3"," REGOR RIS RLOH",10,8,1,224),
new Task(140,"Title4","mOCK PROJECT",90,9,2,224),
new Task(141,"Title3"," REGOR RIS RLOH",10,9,1,224),
new Task(142,"Title4","mOCK PROJECT",90,9,2,224)]

const mockProjects = [new Project(222,"ProjectTitle",2,new Date,new Date,15750000),
new Project(223,"ProjectTitle2",2,new Date,new Date,15750000),
new Project(224,"ProjectTitle3",2,new Date,new Date,15750000),
new Project(225,"ProjectTitle4",2,new Date,new Date,15750000)]

const mockWorkers = [new Worker(1,"Vlada","Aleksenko","Vlada","Vlada",1,0,-1),
new Worker(2,"Egor","Alexandrov","Egor","Egor",2,1500,222),
new Worker(3,"Eduard","Pahomov","Eduard","Eduard",3,0,222),
new Worker(4,"Sasha","Blinov","Login1","Login1",1 ,1000,-1),
new Worker(5,"Sasha","Egorov","Login2","Login2",3 ,800,223),
new Worker(6,"Vlada","Dreykova","Login3","Login3",3 ,1000,223),
new Worker(7,"Ed","Gaponov","Login4","Login4",2 ,1000,224),
new Worker(8,"Egor","Chuykov","Login5","Login5",3 ,1000,224),
new Worker(9,"Vseman","Vasermanov","Login6","Login6",2 ,1000,224),]

app.use(bodyParser.json())

//Получение все проектов
app.get("/projects", (req,res) =>res.json(mockProjects))
//Получение конкретного проекта
app.get("/projects/:id", (req,res) =>{
var project = mockProjects.find(project => project.id===+req.params.id)
res.json(project)
})
//Получение всех работников
app.get("/workers", (req,res) =>res.json(mockWorkers))
//Получение конкретного работника
app.get("/workers/:id", (req,res) =>{
    var worker = mockWorkers.find(worker => worker.id===+req.params.id)
    res.json(worker)
})
//Получение всех задач
app.get("/tasks", (req,res) =>res.json(mockTasks))
//Получение конкретной задачи
app.get("/tasks/:id", (req,res) =>{
    var task = mockTasks.find(task=>task.id===+req.params.id)
    res.json(task)
})
//Получения участников проекта
app.get("/projects/workers/:id",(req,res)=>{
    var project = mockProjects.find(project => project.id===+req.params.id)
    var workers =  mockWorkers.filter(
      worker=> worker.projects.includes(project))
    res.json(workers)
})

//Получение заданий конкретного работника
app.get("/workers/:id/tasks",(req,res)=>{
    console.log(req.params.id)
    var tasks = mockTasks.filter(task=>task.authorId===+req.params.id)
    console.log(tasks)
    res.json(tasks)
})

//Получение заданий конкретного проекта
app.get("/projects/:id/tasks",(req,res)=>{
    var tasks = mockTasks.filter(task=>task.projectId===+req.params.id)
    res.json(tasks)
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
    
    var worker = mockWorkers.find(worker=>worker.login === req.body.login)
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

app.listen(9000)



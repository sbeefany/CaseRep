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

  function Project() {
      if(arguments.length === 6){
        this.id = arguments[0]
        this.title = arguments[1]
        this.leaderId = arguments[2]
        this.theBeginingDate=arguments[3]
        this.theEndDate=arguments[4]
        this.costs=arguments[5]
      }else{
         var projectDTO = arguments[0]
        this.id = Math.floor(Math.random()*Math.floor(100000))
        console.log(this.id)
        this.title = projectDTO.title
        this.leaderId=projectDTO.leaderId
        this.theBeginingDate=projectDTO.theBeginingDate
        this.theEndDate=projectDTO.theEndDate
        this.costs=projectDTO.costs
      }
    

    return this
}
  //1- СОЗДАНО 2- ЗАВЕРШЕНО 
  
  function Task() {
    if(arguments.length === 9){
      this.id = arguments[0]
      this.title = arguments[1]
      this.discription=arguments[2]
      this.weight=arguments[3]
      this.authorId=arguments[4]
      this.status=arguments[5]
      this.projectId = arguments[6]
      this.theBeginingDate=arguments[7]
        this.theEndDate=arguments[8]
    }else{
        var taskDTO = arguments[0]
      this.id = Math.floor(Math.random()*Math.floor(100000))
      console.log(this.id)
      this.title = taskDTO.title
      this.discription=taskDTO.discription
      this.weight=taskDTO.weight
      this.authorId=taskDTO.authorId
      this.status=taskDTO.status
      this.projectId = taskDTO.projectId
      this.theBeginingDate=taskDTO.theBeginingDate
        this.theEndDate=taskDTO.theEndDate
    }
  

  return this
}

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())

const mockTasks=[new Task(123,"Project222","HERE THERE IS A LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOONG DISCRIPTION",100,4,0,222,new Date,new Date),
new Task(124,"Project222","HERE THERE IS A small DISCRIPTION",120,3,1,222,new Date,new Date),
new Task(125,"Project222","HERE THERE IS A DISCRIPTION",20,3,0,222,new Date,new Date),
new Task(126,"Project222"," REGOR RIS RLOH",10,3,1,222,new Date,new Date),
new Task(128,"Project223"," REGOR RIS RLOH",10,6,1,223,new Date,new Date),
new Task(130,"Project223"," REGOR RIS RLOH",10,7,0,223,new Date,new Date),
new Task(131,"Project223","mOCK PROJECT",90,6,1,223,new Date,new Date),
new Task(132,"Project224"," REGOR RIS RLOH",10,9,0,224,new Date,new Date),
new Task(133,"Project224","mOCK PROJECT",90,9,0,224,new Date,new Date),
new Task(134,"Project224"," REGOR RIS RLOH",10,9,0,224,new Date,new Date),
new Task(135,"Project224","mOCK PROJECT",90,9,1,224,new Date,new Date),
new Task(136,"Project224","mOCK PROJECT",90,10,0,224,new Date,new Date),
new Task(137,"Project224"," REGOR RIS RLOH",10,9,1,224,new Date,new Date),
new Task(138,"Project224","mOCK PROJECT",90,10,1,224,new Date,new Date),
new Task(139,"Project224"," REGOR RIS RLOH",10,9,0,224,new Date,new Date),
new Task(140,"Project224","mOCK PROJECT",90,9,1,224,new Date,new Date),
new Task(141,"Project224"," REGOR RIS RLOH",10,10,1,224,new Date,new Date),
new Task(142,"Project224","mOCK PROJECT",90,10,0,224,new Date,new Date)]

const mockProjects = [new Project(222,"ProjectTitle",2,new Date,new Date,15750000),
new Project(223,"ProjectTitle2",5,new Date,new Date,15750000),
new Project(224,"ProjectTitle3",8,new Date,new Date,15750000)]

const mockWorkers = [new Worker(1,"Vlada","Aleksenko","Vlada","Vlada",1,0,-1),
new Worker(2,"Egor","Alexandrov","Admin1","Admin1",2,1500,222),
new Worker(3,"Eduard","Pahomov","Login11","Login11",3,0,222),
new Worker(4,"Sasha","Blinov","Login12","Login112",3 ,1000,222),
new Worker(5,"Sasha","Egorov","Admin2","Admin2",2 ,800,223),
new Worker(6,"Vlada","Dreykova","Login21","Login21",3 ,1000,223),
new Worker(7,"Ed","Gaponov","Login22","Login22",3 ,1000,223),
new Worker(8,"Egor","Chuykov","Admin3","Admin3",2 ,1000,224),
new Worker(9,"Vseman","Vasermanov","Login31","Login31",3 ,1000,224),
new Worker(10,"Vseman2","Vasermanov2","Login32","Login32",3 ,1000,224),
new Worker(11,"Vseman3","Vasermanov3","Login33","Login33",3 ,1000,224),
new Worker(12,"Vseman4","Vasermanov4","Admin4","Admin4",2 ,1000,-2),
new Worker(13,"Vseman5","Vasermanov5","Login41","Login41",3 ,1000,-2),
new Worker(14,"Vseman6","Vasermanov6","Login42","Login42",3 ,1000,-2)
]

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
    var workers =  mockWorkers.filter(
      worker=> worker.projectId === +req.params.id)
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
    var newProject = new Project(req.body)
    mockProjects.push(newProject)
    res.json(newProject.id)
})

app.post("/projects/:id/workers",(req,res) => {
  console.log(req.body)
  var workersId=req.body
  workersId.forEach(workerId => {
    var worker = mockWorkers.find(worker=>worker.id === +workerId)
    worker.projectId=+req.params.id
  });
  res.json()
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
    mockTasks.push(new Task(req.body))
    
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

app.put("/tasks/:id",(req,res)=>{
  var task = mockTasks.find(task=>task.id===+req.params.id)
  var newData = req.body
  if(newData.projectId){
    task.projectId=newData.projectId}
    if(newData.status !== undefined){
  task.status=newData.status}
  if(newData.theBeginingDate){
  task.theBeginingDate=newData.theBeginingDate}
  if(newData.theEndDate){
  task.theEndDate=newData.theEndDate}
  if(newData.title){
  task.title=newData.title}
  if(newData.weight){
  task.weight=newData.weight}
  if(newData.discription){
  task.discription = newData.discription}
  if(newData.authorId){
  task.authorId= newData.authorId}
  res.json(task)
})

app.delete("/tasks/:id",(req,res)=>{
  var index = mockTasks.findIndex(task=>task.id===+req.params.id)
  mockTasks.splice(index,1)
  res.json(mockTasks)
})

app.put("/projects/:id",(req,res)=>{
  var project = mockProjects.find(project=>project.id===+req.params.id)
  var newData = req.body
  if(newData.title){
    project.title =newData.title}
  if(newData.leaderId){
    project.leaderId =newData.leaderId}
  if(newData.theBeginingDate){
    project.theBeginingDate =newData.theBeginingDate}
  if(newData.theEndDate){
    project.theEndDate =newData.theEndDate}
  if(newData.costs){
    project.costs =newData.costs}
    
    
  res.json(project)
})

app.delete("/projects/:id",(req,res)=>{
  var index = mockProjects.findIndex(project=>project.id===+req.params.id)
  mockProjects.splice(index,1)
  res.json(mockProjects)
})

app.listen(9000)



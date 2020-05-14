//Create
let todoItems = [{
    todo: 'Walk',
    id : '0'
    },
    {
    todo:'Dance',
    id :'1'
    },{
    todo:'Code',
    id : '2'
    }]

console.log(todoItems.id)

const express = require('express')
let app = new express();
let bodyParser = require('body-parser')
app.use(bodyParser.json())

//Read
app.get('/',(req,res) => {
    console.log('Welcome to roffys server')
    res.send(todoItems)
})

//add new item
app.post('/addNew/:todo/ololo/:id', (req, res) => {
    todoItems.push(req.params);
    res.send(todoItems);
  });

  //delete item
app.post('/deleteItem/ololo/:id',(req,res) => {
    let findID =parseInt(req.params.id)
    let filteredTodo = todoItems.filter(item => item.id != findID)
    console.log(filteredTodo)
    res.send(filteredTodo)
    
})

//Edit item 
app.post('/editItem/ololo/:id',(req,res) => {
    let findId = parseInt(req.params.id)
    let findIndex = todoItems.findIndex(item => item.id == findId)
    todoItems[findIndex].todo = 'Jump'  
    res.send(todoItems)
    
})


app.listen(3000,function(){
    console.log('server is up')
})
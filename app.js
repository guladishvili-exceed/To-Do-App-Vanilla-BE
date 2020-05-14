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
app.post('/add/', (req, res) => {
    todoItems.push(req.body);
    res.send(todoItems);
  });

//delete item
app.post('/delete/ololo/:id',(req,res) => {
    const findID = +req.params.id
    res.send(todoItems.filter(item => item.id !== findID))
    
})

//edit item 
app.post('/edit/ololo/:id',(req,res) => {
    const findID = +req.params.id
    let findIndex = todoItems.findIndex(item => item.id === findId)
    todoItems[findIndex] = req.body  
    res.send(todoItems)
    
})


app.listen(3000,function(){
    console.log('server is up')
})
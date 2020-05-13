
let todoItems = [{
    todo: 'Walk',
    id : '1'
    },
    {
    todo:'Dance',
    id : '2'
    }]

console.log(todoItems.id)

const express = require('express')
let app = new express();
let bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/',function(req,res){
    console.log('Welcome to roffys server')
    res.send(todoItems)
})

app.post('/addNew',function(req,res){
   console.log(req.body)
   res.send('Post method is up!')
})

app.delete('/deleteObject',function(req,res){
    let findItem = todoItems.findIndex(x => x.id === '2')
    todoItems.splice(findItem)
    res.send(todoItems)
    
})

app.listen(3000,function(){
    console.log('server is up')
})
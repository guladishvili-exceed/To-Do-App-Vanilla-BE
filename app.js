let todoItems = [{
    todo: 'Walk',
    id : 1
    },
    {
    todo: 'Vibe',
    id : 2
    }]

const express = require('express')
let app = new express();

app.get('/',function(req,res){
    
    res.send('Welcome to my server -Roffybc')
})

app.get('/read',function(req,res){
    console.log('This is the page which read everything')
    res.send(todoItems)
})

app.get('/addNew',function(req,res){
    let newArray = todoItems.push({todo:'Run',id:2})
    res.send(todoItems)
})

app.get('/editObject',function(req,res){
    let todoIndex = todoItems.findIndex((obj => obj.id == 1))
    todoItems[todoIndex].todo = 'Code'
    res.send(todoItems)
})

app.get('/deleteObject',function(req,res){
    let todoIndex = todoItems.findIndex((obj => obj.id == 1))
    let deletedArr = todoItems.splice[todoIndex]
    res.send(todoItems)
})

app.listen(3000,function(){
    console.log('server started')
})
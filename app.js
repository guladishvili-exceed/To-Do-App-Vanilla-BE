
const express = require('express')
let app = new express();
let bodyParser = require('body-parser')
app.use(bodyParser.json())

const Todo = require('../backend/data/base')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/todobase')
mongoose.Promise = global.Promise;


//Read
app.get('/',(req,res) => {
    console.log('Welcome to roffys server')
    res.send(todoItems)
})

//add new item
app.post('/add/', (req, res) => {
    Todo.create(req.body).then(todo =>{
        res.send(todo)
        });
  });

//delete item
app.delete('/delete/:id',(req,res) => {
    Todo.findByIdAndRemove({_id: req.params.id}).then(todo => {
        res.send(todo)
    })    
})

//update item
app.put('/edit/:id',(req,res) => {
    Todo.findByIdAndUpdate({_id: req.params.id},req.body).then(() => {
        Todo.findOne({_id: req.params.id}).then(todo => {
            res.send(todo)
        })
    })

    
})


app.listen(3000,function(){
    console.log('server is up')
})
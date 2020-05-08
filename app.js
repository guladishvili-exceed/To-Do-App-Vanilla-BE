

const express = require('express')
let app = new express();
let bodyParser = require('body-parser')

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
let todo = ['Dance']

app.get('/',function(req,res){
    
    res.render('home')
})

app.get('/read',function(req,res){
    res.render('read',{read : todo})
})

app.post('/addNew',function(req,res){
    const newTodo = req.body.newtodo;
    todo.push(newTodo)
    res.redirect('/read')
    
})



app.listen(8080,function(){
    console.log('server started')
})
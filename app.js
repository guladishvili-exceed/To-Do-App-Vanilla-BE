const express = require('express')
let app = new express();

app.get('/',function(req,res){
    res.send('hello from node sample')
})

app.get('/contact',function(req,res){
    res.send('hello from node contact')
})

app.get('/about',function(req,res){
    res.send('hello from node about')
})

app.get('/random',function(req,res){
    res.send('hello from node random')
})

app.listen(3000,function(){
    console.log('server started')
})
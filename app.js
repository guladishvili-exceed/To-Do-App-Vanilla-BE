
const express = require('express')
let app = new express();
let bodyParser = require('body-parser')
let cors = require('cors')
app.use(bodyParser.json())

const Todo = require('../backend/data/base')


const mongoose = require('mongoose')

const MONGO_URL = 'mongodb+srv://niko123:Nikolozi123@cluster0-frldx.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect( MONGO_URL || 'mongodb://localhost/todobase', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})


mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})
mongoose.Promise = global.Promise;

app.use(cors())

//Read
app.get('/',(req,res) => {
    console.log('Welcome to roffys server')
    Todo.find({})
    .exec((err,todo)=>{
        if(err) {
            console.log('Error retrieving todos')
        } else {
            res.json(todo)
        }
    })
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
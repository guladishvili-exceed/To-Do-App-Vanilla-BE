const mongoose = require('mongoose')
const Schema = mongoose.Schema;


//Creating todo schema and model 

const todoSchema = new Schema({
    todo: {
        type:String
    },
    id: {
        type:Number
    },
    
})

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;
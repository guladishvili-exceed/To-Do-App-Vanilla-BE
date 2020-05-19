const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Creating todo schema and model 

const todoSchema = new Schema({
    todo: {
        type:String,
        checked:true
    }
    
    
})

const Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo;
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Creating todo schema and model 

const todoSchema = new Schema({
    username:String,
    todo: String,
    checked: Boolean,
})

const Todo = mongoose.model('Todo',todoSchema);


module.exports = Todo;
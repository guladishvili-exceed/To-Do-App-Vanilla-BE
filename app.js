const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Todo = require('./data/base')
const mongoose = require('mongoose');
const app = new express();
app.use(bodyParser.json())


const MONGO_URL = 'mongodb+srv://niko123:Nikolozi123@cluster0-frldx.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(MONGO_URL || 'mongodb://localhost/todobase', {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})


mongoose.connection.on('connected', () => {
	console.log('Mongoose is connected')
})
mongoose.Promise = global.Promise;

app.use(cors())

//Read
app.get('/', (req, res) => {
	console.log('Welcome to roffys server')
	Todo.find({})
		.exec((err, todo) => {
			if (err) {
				console.log('Error retrieving todos')
			} else {
				console.log('--------todo', todo);
				res.json(todo)
			}
		})
})


//add new item
app.post('/add/', (req, res) => {
	const addTodo = new Todo({todo: req.body.todo, checked: false})
	addTodo.save().then(result => res.status(200).json(result)).catch((err) => console.log(err))
});

//delete item
app.delete('/delete/:id', (req, res) => {
	Todo.findByIdAndRemove({_id: req.params.id}).then(todo => {
		res.send(todo)
	})
})

//Handle checked items
app.delete('/deleteAllChecked/', (req, res) => {
	Todo.deleteMany({checked: true}, (err, result) => {
		console.log('--------result', result);
		if (err) {
			res.send(err)
		} else {
			res.send(result)
		}
	})

})
//update item
app.put('/edit/:id', (req, res) => {
	Todo.findByIdAndUpdate({_id: req.params.id}, req.body).then((todo) => {
		res.send(todo);
		console.log(todo)
	})
})

//Update Checkbox event

app.put('/checkEdit', (req, res) => {

	Todo.updateMany({checkbox: !req.body}, {$set: {checkbox: req.body}})
		.then((todo) => {
			res.send(todo)
			console.log(todo)
		})

})

app.listen(3000, function () {
	console.log('server is up')
})
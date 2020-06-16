const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Todo = require('./data/base')
const User = require('./registration/user')
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
app.get('/:username', (req, res) => {
	console.log('Welcome to roffys server')
	Todo.find({'username' : req.params.username})
		.exec((err, todo) => {
			if (err) {
				console.log('Error retrieving todos')
			} else {
				res.json(todo)
			}
		})
})
//add new item
app.post('/add/', (req, res) => {
	const addTodo = new Todo({username:req.body.username,todo: req.body.todo, checked: false})
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

app.put('/checkEdit/', (req, res) => {
	Todo.updateMany({checked: !req.body.checked}, {$set: {checked: req.body.checked}})
		.then((todo) => {
			res.send(todo)
			console.log(todo)
		})

})

//Add new user A.K.A Registration

app.post('/addUser', (req, res) => {
	const addUser = new User({username: req.body.username, password: req.body.password})
	addUser.save().then(result => res.status(200).json(result)).catch((err) => console.log(err))
})

//Log in A.K.A Sign Up
app.post('/logIn', (req, res) => {
	User.findOne({username: req.body.username, password: req.body.password}).then(result => {
		if (result.username === req.body.username && result.password === req.body.password) {
			res.status(200).send({
				message: 'Successful login'
			})
		} else {
			res.status(404).send({
				message: 'Invalid Login'
			})
		}
	})
})

// Display Todo's For Specific User



app.listen(8080, function () {
	console.log('server is up')
})
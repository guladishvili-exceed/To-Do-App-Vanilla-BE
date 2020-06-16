
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Create new user and add it to database

const UserSchema = new Schema({
	username:{type: String, unique: ('That username is already taken')},
	password:String,
})

const User = mongoose.model('User',UserSchema)
module.exports = User;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Todo = require("./data/base");
const User = require("./registration/user");
const verify = require("./verifyToken");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = new express();
app.use(bodyParser.json());
const MONGO_URL =
  "mongodb+srv://niko123:Nikolozi123@cluster0-frldx.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(MONGO_URL || "mongodb://localhost/todobase", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});
mongoose.Promise = global.Promise;
app.use(cors());
//Read
app.get("/:username", verify, (req, res, next) => {
  console.log("Welcome to roffys server");
  Todo.find({ username: req.params.username })
    .then((todo) => {
      res.status(200).send(todo);
    })
    .catch((err) => {
      console.log("err");
    });
});
//add new item
app.post("/add/", (req, res) => {
  const addTodo = new Todo({
    username: req.body.username,
    todo: req.body.todo,
    checked: false,
  });
  addTodo
    .save()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});
//delete item
app.delete("/delete/:id", (req, res) => {
  Todo.findByIdAndRemove({ _id: req.params.id }).then((todo) => {
    res.send(todo);
  });
});
//Handle checked items
app.delete("/deleteAllChecked/", (req, res) => {
  Todo.deleteMany({ checked: true }, (err, result) => {
    console.log("--------result", result);
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});
//update item
app.put("/edit/:id", (req, res) => {
  Todo.findByIdAndUpdate({ _id: req.params.id }, req.body).then((todo) => {
    res.send(todo);
    console.log(todo);
  });
});
//Update Checkbox event
app.put("/checkEdit/", (req, res) => {
  Todo.updateMany(
    { checked: !req.body.checked },
    { $set: { checked: req.body.checked } }
  ).then((todo) => {
    res.send(todo);
    console.log(todo);
  });
});
//Add new user A.K.A Registration
app.post("/addUser", async (req, res) => {
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist) return res.status(400).send("Email already exist");
  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  //- - - - - - - -
  const addUser = new User({
    username: req.body.username,
    password: hashPassword,
  });
  try {
    const savedUser = await addUser.save();
    res.send(savedUser);
  } catch (err) {
    res.status(404).send(err);
  }
});
//Log in A.K.A Sign Up
app.post("/logIn", async (req, res) => {
  //Checking if email exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid Username");
  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");
  //Create and assign a token
  const token = jwt.sign({ user }, "secretkey");
  res.header("auth-token", token).send(token);
  // res.send('Logged in ')
});
app.listen(8080, function () {
  console.log("server is up");
});

require("dotenv").config();

const cors = require("cors");

const Todo = require("./models/Todo");

const express = require('express');

const connectDB = require("./config/db");

const app = express();

app.use(cors());

connectDB();

const port = 5000;

let todos = [];

app.use(express.json());

app.get('/', (req,res)=>{
res.send("Hello this is Vishnu")
})

app.get("/todos", async (req, res) => {

    const todos = await Todo.find();

    res.json(todos);

});

app.post("/todos", async (req, res) => {

    const newTodo = new Todo({

        text: req.body.text,

    });

    await newTodo.save();

    res.status(201).json(newTodo);

});

app.delete("/todos/:id", async (req, res) => {

    await Todo.findByIdAndDelete(req.params.id);

    res.json({
        message: "Todo Deleted"
    });

});

app.put("/todos/:id", async (req, res) => {

    const todo = await Todo.findById(req.params.id);

    todo.completed = !todo.completed;

    await todo.save();

    res.json(todo);

});
app.listen(port,()=>{
    console.log("The app is running at port " + port);
})
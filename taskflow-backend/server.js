const bcrypt = require("bcryptjs");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const authMiddleware = require("./middleware/authMiddleware");

require("dotenv").config();

const cors = require("cors");

const Todo = require("./models/Todo");

const express = require('express');

const connectDB = require("./config/db");

const app = express();

app.use(cors());

connectDB();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req,res)=>{
res.send("Hello this is Vishnu")
})


app.post("/signup", async (req, res) => {

    try {

        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }

});

app.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
            });

        }
        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                existingUser.password
            );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid Password",
            });
        }

        const token = jwt.sign(
            {
                id: existingUser._id
            },
            process.env.JWT_SECRET,
            {
               expiresIn: "7d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error",
        });
    }
});

app.get( "/todos", authMiddleware,
    async (req, res) => {

        const todos = await Todo.find({
            user: req.userId,
        });

        res.json(todos);
    }
);

app.post("/todos", authMiddleware, async (req, res) => {

    const newTodo = new Todo({

        text: req.body.text,
        user: req.userId,

    });

    await newTodo.save();

    res.status(201).json(newTodo);

});

app.delete("/todos/:id", authMiddleware, async (req, res) => {

    await Todo.findByIdAndDelete(req.params.id);

    res.json({
        message: "Todo Deleted"
    });

});

app.put("/todos/:id", authMiddleware, async (req, res) => {

    const todo = await Todo.findById(req.params.id);

    todo.completed = !todo.completed;

    await todo.save();

    res.json(todo);

});
app.listen(port,()=>{
    console.log("The app is running at port " + port);
})
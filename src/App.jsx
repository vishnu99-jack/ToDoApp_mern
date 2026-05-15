import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Signup from "./components/Signup";
import Login from "./components/Login";

import "./App.css";

import axios from "axios";

import { useEffect, useState } from "react";

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {

      setIsLoggedIn(true);

    }

  }, []);

  useEffect(() => {

    if (isLoggedIn) {

      fetchTodos();

    }

  }, [isLoggedIn]);


  const fetchTodos = async () => {

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "https://taskflow-backend-6dj3.onrender.com/todos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(response.data);

    }
    catch (error) {
      console.log(error);
    }
  };

  const handleAddTodo = async () => {

    if (input.trim() === "") {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      await axios.post(
        "https://taskflow-backend-6dj3.onrender.com/todos",
        {
          text: input
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodos();

      setInput("");

    }
    catch (error) {
      console.log(error);
    }

  };
  const handleDeleteTodo = async (id) => {

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://taskflow-backend-6dj3.onrender.com/todos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTodos();
    }
    catch (error) {
      console.log(error);

    }
  };

  const handleToggleTodo = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `https://taskflow-backend-6dj3.onrender.com/todos/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTodos();

    }
    catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  if (!isLoggedIn) {
    return (
      <div className="app">
        {
          showSignup ? (
            <Signup
              setIsLoggedIn={setIsLoggedIn}
              setShowSignup={setShowSignup}
            />
          ) : (
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setShowSignup={setShowSignup}
            />
          )
        }
      </div>
    );
  }

  return (

    <div className="app">

      <div className="todo-container">

        <h1 className="title">
          TaskFlow Todo App
        </h1>

        <button
          onClick={handleLogout}
          className="logout-btn"
        >
          Logout
        </button>

        <TodoForm
          input={input}
          setInput={setInput}
          handleAddTodo={handleAddTodo}
        />

        <TodoList
          todos={todos}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
        />

      </div>

    </div>

  );

}

export default App;
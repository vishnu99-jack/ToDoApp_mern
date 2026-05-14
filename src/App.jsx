import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");

  useEffect(() => {

    fetchTodos();

}, []);

const fetchTodos = async () => {

    try {

        const response = await axios.get(
            "http://localhost:5000/todos"
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
        await axios.post(
            "http://localhost:5000/todos",
            {
                text: input
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
      await axios.delete(
        `http://localhost:5000/todos/${id}`
      );
      fetchTodos();
    }
    catch (error) {
      console.log(error);
    }

  };

  const handleToggleTodo = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/todos/${id}`
      );
      fetchTodos();
    }

    catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="app">

      <div className="todo-container">

        <h1 className="title">
          TaskFlow Todo App
        </h1>

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

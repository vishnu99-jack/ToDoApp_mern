import TodoItem from "./TodoItem";

function TodoList(props) {

  return (

    <div className="todo-list-container">

      <h2 className="list-title">
        Your Tasks
      </h2>

      {
        props.todos.length === 0 ? (

          <p className="empty-message">
            No tasks added yet
          </p>

        ) : (

          props.todos.map((todo, index) => (

            <TodoItem
              key={todo._id}
              item={todo}
              id={todo._id}
              handleDeleteTodo={
                props.handleDeleteTodo
              }
              handleToggleTodo={props.handleToggleTodo}
            />

          ))
        )
      }

    </div>
  );
}

export default TodoList;
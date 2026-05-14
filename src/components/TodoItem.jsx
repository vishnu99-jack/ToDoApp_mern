function TodoItem(props) {

    return (

        <div className="todo-item">

            <div className="todo-left">

                <input
                    type="checkbox"
                    checked={props.item.completed}
                    onChange={() =>
                        props.handleToggleTodo(props.id)
                    }
                />

                <span
                    className={
                        props.item.completed
                            ? "completed-task"
                            : "active-task"
                    }
                >
                    {props.item.text}
                </span>

            </div>

            <button
                onClick={() =>
                    props.handleDeleteTodo(props.id)
                }
                className="delete-btn"
            >
                Delete
            </button>

        </div>
    );
}

export default TodoItem;
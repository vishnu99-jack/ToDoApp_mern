function TodoForm(props) {

    return (

        <div className="todo-form">

            <div className="input-group">

                <input
                    type="text"
                    placeholder="Enter your next task..."
                    value={props.input}
                    onChange={(e) =>
                        props.setInput(e.target.value)
                    }
                    className="todo-input"
                />

                <button
                    onClick={props.handleAddTodo}
                    className="add-btn"
                >
                    Add
                </button>

            </div>

        </div>
    );
}

export default TodoForm;
import React, { useState, useEffect } from "react";
// import "./styles.css";

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      return savedTodos;
    } else {
      return [];
    }
  });
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodoKeyDown = (event) => {
    if (event.key === "Enter") {
      const newTodo = {
        id: Date.now(),
        text: newTodoText,
        completed: false
      };
      setTodos([...todos, newTodo]);
      setNewTodoText("");
    }
  };

  const handleTodoDoubleClick = (todoId) => {
    setEditingTodoId(todoId);
  };

  const handleTodoBlur = () => {
    setEditingTodoId(null);
  };

  const handleTodoCompleteToggle = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const handleTodoTextChange = (event, todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, text: event.target.value };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
  };

  const handleTodoDelete = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <input
                type="text"
                value={todo.text}
                onChange={(event) => handleTodoTextChange(event, todo.id)}
                onBlur={handleTodoBlur}
                autoFocus
              />
            ) : (
              <span
                onDoubleClick={() => handleTodoDoubleClick(todo.id)}
                className={todo.completed ? "completed" : ""}
              >
                {todo.text}
              </span>
            )}
            <button onClick={() => handleTodoCompleteToggle(todo.id)}>
              {todo.completed ? "Pending" : "Complete"}
            </button>
            <button onClick={() => handleTodoDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTodoText}
        onChange={(event) => setNewTodoText(event.target.value)}
        onKeyDown={handleNewTodoKeyDown}
        placeholder="Add a new todo"
      />
    </div>
  );
}

export default TodoList;
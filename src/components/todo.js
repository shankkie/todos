import React from "react";
import styles from "./todo.module.css";
import axios from "axios";

const Todo = ({ todo, reloadTodos }) => {
  const toggleCompleted = () => {
    axios
      .post("/api/update-todo", {
        id: todo._id,
        text: todo.text,
        completed: !todo.completed,
      })
      .then(reloadTodos);
  };

  const deleteTodo = () => {
    axios
      .post("/api/delete-todo", {
        id: todo._id,
      })
      .then(reloadTodos);
  };

  return (
    <>
      <label className={styles.label} htmlFor={`todo-toggle-${todo._id}`}>
        Mark Complete
      </label>
      <input
        type="checkbox"
        id={`todo-toggle-${todo._id}`}
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <p className={`${styles.text} ${todo.completed && styles.completed}`}>
        {todo.text}
      </p>
      <label htmlFor={`todo-delete-${todo._id}`} className={styles.label}>
        delete
      </label>
      <button onClick={deleteTodo} className={styles.delete}>
        <span role="img" aria-label="delete this todo" title="delete">
          ❌
        </span>
      </button>
    </>
  );
};

export default Todo;

import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./index.module.css";
import Todo from "../components/todo";
import Form from "../components/form";

export default () => {
  const [status, setStatus] = useState("loading");
  const [todos, setTodos] = useState(null);

  useEffect(() => {
    let canceled = false;

    if (status !== "loading") return;

    axios("/api/get-all-todos").then((result) => {
      if (canceled === true) return;
      if (result.status !== 200) {
        console.error("Error loading todos!");
        console.error(result);
        return;
      }
      setTodos(result.data.todos);
      setStatus("loaded");
    });
  }, [status]);

  const reloadTodos = () => setStatus("loading");

  return (
    <main>
      <h1 className={styles.heading}>
        Jamstack ToDo Demo using serverless and Fauna DB
      </h1>
      <Form reloadTodos={reloadTodos} />
      {todos ? (
        <ul className={styles.todos}>
          {todos.map((todo) => (
            <li className={styles.todo} key={todo._id}>
              <Todo todo={todo} reloadTodos={reloadTodos} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.loading}>loading...</p>
      )}
    </main>
  );
};

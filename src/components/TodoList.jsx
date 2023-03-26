import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";
import axios from "axios";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const backendUrl = "https://todo-app-backend-bbhw.onrender.com";

  const fetchFromDB = () => {
    try {
      axios.get(`${backendUrl}/todos`).then((res) => {
        console.log("res", res);
        setTodos(res.data);
      });
    } catch (error) {
      console.log("error:", error);
    }
  };

  const insertToDB = (todo) => {
    try {
      axios.post(`${backendUrl}/todos`, todo).then((res) => {
        console.log("res", res);
      });
    } catch (error) {
      console.log("error:", error);
    }
  };

  const deleteFromDB = (id) => {
    try {
      axios.delete(`${backendUrl}/todos/${id}`).then((res) => {
        console.log("res", res);
      });
    } catch (error) {
      console.log("error:", error);
    }
  };

  const updateToDB = (id, todo) => {
    try {
      axios.patch(`${backendUrl}/todos/${id}`, todo).then((res) => {
        console.log("res", res);
      });
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    fetchFromDB();
  }, []);

  const addTodo = (todo) => {
    console.log("todo:", todo);
    if (!todo.text) {
      return;
    }
    insertToDB(todo);
    const newTodos = [...todos, todo];

    setTodos(newTodos);
    console.log("...todos:", ...todos);
  };

  const updateTodo = (todoId, newValue) => {
    console.log("update id", todoId, newValue);
    if (!newValue) {
      return;
    }
    updateToDB(todoId, newValue);
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);
    deleteFromDB(id);
    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
        updateToDB(id, todo);
      }
      return todo;
    });
    setTodos(updatedTodos);
    console.log("updatedTodos:", updatedTodos);
  };

  return (
    <div>
      <h1>What's the plan for today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;

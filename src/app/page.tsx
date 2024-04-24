"use client";
import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    if (input.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInput("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
      <div className="flex justify-center mb-4">
        <input type="text" className="border-2 border-gray-300 p-2 mr-2 rounded" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new task" />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={`flex items-center justify-between p-2 ${todo.completed ? "bg-green-200" : "bg-gray-100"}`}>
            <span className={`flex-1 ${todo.completed ? "line-through" : ""}`}>{todo.text}</span>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2" onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded ml-2" onClick={() => handleToggleComplete(todo.id)}>
              Toggle
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

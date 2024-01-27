// App.js

import React, { useState, useEffect } from "react"
import { initialTodos, createTodo } from "./todos"

export default function TodoList() {
    const [todos, setTodos] = useState(initialTodos)
    const [showActive, setShowActive] = useState(false)
    const [activeTodos, setActiveTodos] = useState([])
    const [visibleTodos, setVisibleTodos] = useState([])
    const [editingTodo, setEditingTodo] = useState(null)

    useEffect(() => {
        setActiveTodos(todos.filter((todo) => !todo.completed))
    }, [todos])

    useEffect(() => {
        setVisibleTodos(showActive ? activeTodos : todos)
    }, [showActive, todos, activeTodos])

    return (
        <>
            <label>
                <input
                    type="checkbox"
                    checked={showActive}
                    onChange={(e) => setShowActive(e.target.checked)}
                />
                Show only active todos
            </label>
            <NewTodo onAdd={(newTodo) => setTodos([...todos, newTodo])} />
            <ul>
                {visibleTodos.map((todo) => (
                    <li key={todo.id}>
                        {editingTodo === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={todo.text}
                                    onChange={(e) =>
                                        setTodos((prevTodos) =>
                                            prevTodos.map((t) =>
                                                t.id === todo.id
                                                    ? { ...t, text: e.target.value }
                                                    : t
                                            )
                                        )
                                    }
                                />
                                <button onClick={() => setEditingTodo(null)}>Cancel</button>
                                <button onClick={() => setEditingTodo(null)}>Save</button>
                            </>
                        ) : (
                            <>
                                <span
                                    style={{
                                        textDecoration: todo.completed
                                            ? "line-through"
                                            : "none",
                                    }}
                                >
                                    {todo.text}
                                </span>
                                <button onClick={() => setEditingTodo(todo.id)}>Edit</button>
                                <button
                                    onClick={() =>
                                        setTodos((prevTodos) =>
                                            prevTodos.map((t) =>
                                                t.id === todo.id
                                                    ? { ...t, completed: !t.completed }
                                                    : t
                                            )
                                        )
                                    }
                                >
                                    {todo.completed ? "Убрать" : "Зачеркнуть"}
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <footer>{activeTodos.length} todos left</footer>
        </>
    )
}
function NewTodo({ onAdd }) {
    const [text, setText] = useState("")
    function handleAddClick() {
        setText("")
        onAdd(createTodo(text))
    }
    return (
        <>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={handleAddClick}>Add</button>
        </>
    )
}

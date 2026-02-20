"use client";

import { useMemo, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import styles from "@/styles/todo/todo.module.css";
import type { Filter, Todo } from "./types";
import usePersistedTodos from "./hooks/usePersistedTodos";

export default function TodoApp() {
  const { todos, setTodos } = usePersistedTodos();
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.done);
    if (filter === "done") return todos.filter((t) => t.done);
    return todos;
  }, [filter, todos]);

  const visibleCount = filteredTodos.length;

  const addTodo = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;

    setTodos((prev) => [
      { id: crypto.randomUUID(), title: trimmed, done: false },
      ...prev,
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todo</h1>
          <p className={styles.meta}>表示中: {visibleCount}</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <TodoFilters value={filter} onChange={setFilter} />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </section>
    </main>
  );
}

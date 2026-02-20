"use client";

import { useEffect, useMemo, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import styles from "@/styles/todo/todo.module.css";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
};

const STORAGE_KEY = "todo-next.todos";
const defaultTodos: Todo[] = [
  { id: "1", title: "牛乳を買う", done: false },
  { id: "2", title: "Nextのプロジェクト作る", done: true },
];

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>(() => defaultTodos);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setHasLoaded(true);
      return;
    }

    try {
      const parsed = JSON.parse(stored) as Todo[];
      if (Array.isArray(parsed)) {
        setTodos(parsed);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos, hasLoaded]);

  const remainingCount = useMemo(
    () => todos.filter((t) => !t.done).length,
    [todos],
  );

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
          <p className={styles.meta}>未完了: {remainingCount}</p>
        </header>

        <TodoForm onAdd={addTodo} />

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </section>
    </main>
  );
}

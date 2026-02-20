"use client";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import styles from "@/styles/todo/todo.module.css";
import useTodoState from "./hooks/useTodoState";

export default function TodoApp() {
  const {
    filteredTodos,
    visibleCount,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useTodoState();

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

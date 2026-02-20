"use client";

import { useMemo, useState } from "react";
import type { Filter, Todo } from "../types";
import usePersistedTodos from "./usePersistedTodos";

type TodoState = {
  todos: Todo[];
  filteredTodos: Todo[];
  visibleCount: number;
  filter: Filter;
  setFilter: (next: Filter) => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

export default function useTodoState(): TodoState {
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

  return {
    todos,
    filteredTodos,
    visibleCount,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}

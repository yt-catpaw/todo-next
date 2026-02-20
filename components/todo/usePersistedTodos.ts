"use client";

import { useEffect, useState } from "react";
import type { Todo } from "./types";

const STORAGE_KEY = "todo-next.todos";
const defaultTodos: Todo[] = [
  { id: "1", title: "牛乳を買う", done: false },
  { id: "2", title: "Nextのプロジェクト作る", done: true },
];

export default function usePersistedTodos() {
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

  return { todos, setTodos };
}

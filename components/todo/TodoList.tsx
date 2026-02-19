"use client";

import type { Todo } from "./TodoApp";
import styles from "@/styles/todo/list.module.css";
import Button from "@/components/ui/Button";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return <p className={styles.empty}>Todoがありません</p>;
  }

  return (
    <ul className={styles.list}>
      {todos.map((t) => (
        <li key={t.id} className={styles.item}>
          <label className={styles.itemLeft}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={t.done}
              onChange={() => onToggle(t.id)}
            />
            <span className={t.done ? styles.doneText : styles.text}>
              {t.title}
            </span>
          </label>

          <Button
            className={styles.delete}
            type="button"
            variant="danger"
            size="sm"
            onClick={() => onDelete(t.id)}
            aria-label="削除"
          >
            削除
          </Button>
        </li>
      ))}
    </ul>
  );
}

"use client";

import { useState } from "react";
import styles from "@/styles/todo/form.module.css";
import type { SyntheticEvent } from "react";
import Button from "@/components/ui/Button";

type Props = {
  onAdd: (title: string) => void;
};

export default function TodoForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    onAdd(title);
    setTitle("");
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <label className={styles.label}>
        <span className={styles.labelText}>新しいTodo</span>
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="例）請求書送る"
        />
      </label>

      <Button className={styles.button} type="submit">
        追加
      </Button>
    </form>
  );
}

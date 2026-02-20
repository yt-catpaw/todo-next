"use client";

import styles from "@/styles/todo/todo.module.css";
import type { Filter } from "./types";

type Props = {
  value: Filter;
  onChange: (filter: Filter) => void;
};

export default function TodoFilters({ value, onChange }: Props) {
  return (
    <div className={styles.filters}>
      <button
        className={value === "all" ? styles.filterButtonActive : styles.filterButton}
        type="button"
        onClick={() => onChange("all")}
      >
        All
      </button>
      <button
        className={
          value === "active" ? styles.filterButtonActive : styles.filterButton
        }
        type="button"
        onClick={() => onChange("active")}
      >
        Active
      </button>
      <button
        className={value === "done" ? styles.filterButtonActive : styles.filterButton}
        type="button"
        onClick={() => onChange("done")}
      >
        Done
      </button>
    </div>
  );
}

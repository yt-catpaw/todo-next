"use client";

import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoFilters from "./components/TodoFilters";
import styles from "@/styles/todo/todo.module.css";
import useTodoState from "./hooks/useTodoState";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

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
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Todo</h1>
          <div className={styles.headerActions}>
            <p className={styles.meta}>表示中: {visibleCount}</p>
            <Button
              className={styles.helpButton}
              variant="ghost"
              size="sm"
              type="button"
              onClick={() => setIsHelpOpen(true)}
            >
              ヘルプ
            </Button>
          </div>
        </header>

        <TodoForm onAdd={addTodo} />

        <TodoFilters value={filter} onChange={setFilter} />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />

        <Modal
          isOpen={isHelpOpen}
          onClose={() => setIsHelpOpen(false)}
          title="使い方"
        >
          <div className={styles.helpBody}>
            <p>追加: 入力して「追加」ボタンで登録。</p>
            <p>完了: チェックを入れると取り消し線が付きます。</p>
            <p>削除: 各行の「削除」を押すと削除されます。</p>
            <p>フィルタ: All / Active / Done で表示を切り替え。</p>
          </div>
        </Modal>
      </section>
    </main>
  );
}

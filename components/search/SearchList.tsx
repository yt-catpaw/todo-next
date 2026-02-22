"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "@/styles/search/search.module.css";

type Task = {
  id: string;
  title: string;
  tag: string;
};

type Status = "loading" | "success" | "error";

const TASKS: Task[] = [
  { id: "t1", title: "請求書を送る", tag: "事務" },
  { id: "t2", title: "来週の会議資料を作る", tag: "仕事" },
  { id: "t3", title: "美容院の予約", tag: "生活" },
  { id: "t4", title: "冷蔵庫の掃除", tag: "家事" },
  { id: "t5", title: "英語の単語復習", tag: "学習" },
  { id: "t6", title: "ジョギング 30 分", tag: "健康" },
  { id: "t7", title: "ガス代を支払う", tag: "支払い" },
  { id: "t8", title: "書類のスキャン", tag: "事務" },
  { id: "t9", title: "デザインレビューの準備", tag: "仕事" },
  { id: "t10", title: "祖母に電話", tag: "家族" },
  { id: "t11", title: "本を10ページ読む", tag: "学習" },
  { id: "t12", title: "旅行の持ち物リストを作る", tag: "予定" },
];

export default function SearchList() {
  const [status, setStatus] = useState<Status>("loading");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<Task[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const shouldFail = Math.random() < 0.25;
      if (shouldFail) {
        setStatus("error");
        setItems([]);
        return;
      }
      setItems(TASKS);
      setStatus("success");
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [reloadKey]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (task) =>
        task.title.toLowerCase().includes(q) ||
        task.tag.toLowerCase().includes(q),
    );
  }, [items, query]);

  const retry = () => {
    setStatus("loading");
    setItems([]);
    setReloadKey((prev) => prev + 1);
  };

  return (
    <main className={styles.page}>
      <section className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className={styles.kicker}>Search Playground</p>
            <h1 className={styles.title}>タスク検索</h1>
          </div>
          <p className={styles.meta}>
            {status === "success" ? `件数: ${filteredItems.length}` : "取得中"}
          </p>
        </header>

        <label className={styles.search}>
          <span className={styles.searchLabel}>キーワード</span>
          <input
            className={styles.input}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="例）支払い / 仕事 / 学習"
          />
        </label>

        {status === "loading" && (
          <p className={styles.status} aria-live="polite">
            取得中…
          </p>
        )}

        {status === "error" && (
          <div className={styles.error} role="alert">
            <p>取得に失敗しました。もう一度試してください。</p>
            <button className={styles.retry} type="button" onClick={retry}>
              再試行
            </button>
          </div>
        )}

        {status === "success" && (
          <>
            {filteredItems.length === 0 ? (
              <p className={styles.empty}>一致するタスクがありません。</p>
            ) : (
              <ul className={styles.list}>
                {filteredItems.map((task) => (
                  <li key={task.id} className={styles.item}>
                    <div>
                      <p className={styles.itemTitle}>{task.title}</p>
                      <span className={styles.tag}>{task.tag}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}

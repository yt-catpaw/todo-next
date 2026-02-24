"use client";

import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "@/styles/todo/form.module.css";
import Button from "@/components/ui/Button";

type Props = {
  onAdd: (title: string) => void;
};

const MAX_TITLE_LENGTH = 50;

const schema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "空のTodoは追加できません。")
    .max(MAX_TITLE_LENGTH, `${MAX_TITLE_LENGTH}文字以内で入力してください。`),
});

type FormValues = z.infer<typeof schema>;

export default function TodoForm({ onAdd }: Props) {
  const errorId = useId();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: "" },
  });

  const errorMessage = errors.title?.message;

  const submit = (data: FormValues) => {
    onAdd(data.title);
    reset();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(submit)}>
      <label className={styles.label}>
        <span className={styles.labelText}>新しいTodo</span>
        <input
          className={
            errorMessage ? `${styles.input} ${styles.inputError}` : styles.input
          }
          placeholder="例）請求書送る"
          aria-invalid={errorMessage ? "true" : "false"}
          aria-describedby={errorMessage ? errorId : undefined}
          {...register("title")}
        />
      </label>

      {errorMessage && (
        <span className={styles.error} role="alert" id={errorId}>
          {errorMessage}
        </span>
      )}

      <Button className={styles.button} type="submit" variant="primary" size="md">
        追加
      </Button>
    </form>
  );
}

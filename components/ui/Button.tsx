import type { ButtonHTMLAttributes } from "react";
import styles from "@/styles/ui/button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ type = "button", ...props }: Props) {
  const className = props.className
    ? `${styles.button} ${props.className}`
    : styles.button;

  return <button type={type} {...props} className={className} />;
}

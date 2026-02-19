import type { ButtonHTMLAttributes } from "react";
import styles from "@/styles/ui/button.module.css";

type Variant = "primary" | "danger" | "ghost";
type Size = "sm" | "md";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

const variantClass: Record<Variant, string> = {
  primary: styles.primary,
  danger: styles.danger,
  ghost: styles.ghost,
};

const sizeClass: Record<Size, string> = {
  sm: styles.sm,
  md: styles.md,
};

export default function Button({
  type = "button",
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  const classes = [styles.button, variantClass[variant], sizeClass[size], className]
    .filter(Boolean)
    .join(" ");

  return <button type={type} {...props} className={classes} />;
}

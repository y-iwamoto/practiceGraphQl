import { ButtonHTMLAttributes, FC } from "react";
import styles from "./SubmitButton.module.css";

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode;
}

export const SubmitButton: FC<SubmitButtonProps> = ({ loading = false, children, ...props }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={styles.button}
      {...props}
    >
      {children}
    </button>
  )
}
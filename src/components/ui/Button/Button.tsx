import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary";
  loading?: boolean;
}

export function Button({
  children,
  fullWidth = false,
  variant = "primary",
  loading = false,
  className = "",
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`primary-button ${variant} ${
        fullWidth ? "full-width" : ""
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="button-loading">
          <span className="loading-spinner"></span>
          {children}
        </div>
      ) : (
        children
      )}
    </button>
  );
}

import type { InputHTMLAttributes } from "react";
import "./TextInput.css";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextInput({
  label,
  error,
  className = "",
  ...props
}: TextInputProps) {
  return (
    <div className="text-input-container">
      <label className="text-input-label">{label}</label>
      <input
        className={`text-input ${error ? "text-input-error" : ""} ${className}`}
        {...props}
      />
      {error && <span className="text-input-error-message">{error}</span>}
    </div>
  );
}

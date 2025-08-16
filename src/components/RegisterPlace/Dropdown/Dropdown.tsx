"use client";

import { useState, useRef, useEffect } from "react";
import "./Dropdown.css";

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  placeholder?: string;
}

export function Dropdown({
  label,
  value,
  onChange,
  options,
  error,
  placeholder = "Selecione uma opção",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <label className="dropdown-label">{label}</label>
      <div
        className={`dropdown-trigger ${error ? "dropdown-error" : ""} ${
          isOpen ? "dropdown-open" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "dropdown-value" : "dropdown-placeholder"}>
          {value || placeholder}
        </span>
        <svg
          className={`dropdown-arrow ${isOpen ? "dropdown-arrow-up" : ""}`}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className={`dropdown-option ${
                value === option ? "dropdown-option-selected" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {error && <span className="dropdown-error-message">{error}</span>}
    </div>
  );
}

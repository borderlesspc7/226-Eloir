"use client";

import React, { useState } from "react";
import { Button } from "../../ui/Button/Button";
import "./MultiInputList.css";
import { TextInput } from "../../ui/TextInput/TextInput";

interface MultiInputListProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  error?: string;
  placeholder?: string;
  maxItems?: number;
}

export function MultiInputList({
  label,
  items,
  onChange,
  error,
  placeholder,
  maxItems = 20,
}: MultiInputListProps) {
  const [inputValue, setInputValue] = useState("");

  const addItem = () => {
    const trimmedValue = inputValue.trim();
    if (
      trimmedValue &&
      !items.includes(trimmedValue) &&
      items.length < maxItems
    ) {
      onChange([...items, trimmedValue]);
      setInputValue("");
    }
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="multi-input-list-container">
      <div className="multi-input-list-input-section">
        <div className="multi-input-list-input-wrapper">
          <TextInput
            label={label}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            className={`multi-input-list-input ${
              error ? "multi-input-list-input-error" : ""
            }`}
            disabled={items.length >= maxItems}
          />
          <Button
            type="button"
            onClick={addItem}
            disabled={
              !inputValue.trim() ||
              items.includes(inputValue.trim()) ||
              items.length >= maxItems
            }
            variant="secondary"
          >
            Adicionar
          </Button>
        </div>
        {items.length >= maxItems && (
          <p className="multi-input-list-limit">
            Limite máximo de {maxItems} itens atingido
          </p>
        )}
      </div>

      {items.length > 0 && (
        <div className="multi-input-list-items">
          {items.map((item, index) => (
            <div className="multi-input-list-item" key={index}>
              <span className="multi-input-list-item-text">{item}</span>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="multi-input-list-remove-button"
                aria-lavel={`Remover ${item}`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M12 4L4 12M4 4L12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="multi-input-list-counter">
        {items.length} de {maxItems} itens
      </div>

      {error && <span className="multi-input-list-erro-messager">{error}</span>}
    </div>
  );
}

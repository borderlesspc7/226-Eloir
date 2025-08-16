"use client";

import type React from "react";

import { useRef } from "react";
import { Button } from "../../ui/Button/Button";
import "./FileUploader.css";

interface FileUploaderProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
  acceptedTypes?: string[];
  error?: string;
}

export function FileUploader({
  files,
  onChange,
  maxFiles = 5,
  maxSizePerFile = 10,
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png"],
  error,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles: File[] = [];
    const errors: string[] = [];

    selectedFiles.forEach((file) => {
      // Check file type
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        errors.push(`${file.name}: Tipo de arquivo não suportado`);
        return;
      }

      // Check file size
      if (file.size > maxSizePerFile * 1024 * 1024) {
        errors.push(
          `${file.name}: Arquivo muito grande (máx. ${maxSizePerFile}MB)`
        );
        return;
      }

      // Check if file already exists
      if (files.some((existingFile) => existingFile.name === file.name)) {
        errors.push(`${file.name}: Arquivo já adicionado`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert("Erros encontrados:\n" + errors.join("\n"));
    }

    // Check total files limit
    const newFiles = [...files, ...validFiles].slice(0, maxFiles);
    onChange(newFiles);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = Array.from(e.dataTransfer.files);
    const mockEvent = {
      target: { files: droppedFiles },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleFileSelect(mockEvent);
  };

  return (
    <div className="file-uploader-container">
      <div
        className={`file-uploader-dropzone ${
          error ? "file-uploader-error" : ""
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="file-uploader-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 8V32M16 24L24 32L32 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 40H40"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="file-uploader-text">
          <p className="file-uploader-primary-text">
            Arraste arquivos aqui ou clique para selecionar
          </p>
          <p className="file-uploader-secondary-text">
            Tipos aceitos: {acceptedTypes.join(", ")} • Máx. {maxSizePerFile}MB
            por arquivo
          </p>
        </div>

        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
          disabled={files.length >= maxFiles}
        >
          Selecionar Arquivos
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
          className="file-uploader-input"
        />
      </div>

      {files.length > 0 && (
        <div className="file-uploader-list">
          <h4 className="file-uploader-list-title">
            Arquivos selecionados ({files.length}/{maxFiles})
          </h4>

          {files.map((file, index) => (
            <div key={index} className="file-uploader-item">
              <div className="file-uploader-item-info">
                <div className="file-uploader-item-icon">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4 4V16H16V7L13 4H4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13 4V7H16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="file-uploader-item-details">
                  <span className="file-uploader-item-name">{file.name}</span>
                  <span className="file-uploader-item-size">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeFile(index)}
                className="file-uploader-remove-button"
                aria-label={`Remover ${file.name}`}
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

      {error && <span className="file-uploader-error-message">{error}</span>}
    </div>
  );
}

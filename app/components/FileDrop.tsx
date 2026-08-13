"use client";

import { useRef } from "react";
import { ACCEPTED_FILES, formatFileSize } from "../lib/materials";

type Props = {
  file: File | null;
  onPick: (file: File | null) => void;
  /** Max upload size in bytes. */
  maxSize?: number;
};

const DEFAULT_MAX = 25 * 1024 * 1024;

/** Click-or-drag file picker used by the LMS forms. */
export function FileDrop({ file, onPick, maxSize = DEFAULT_MAX }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const tooBig = file !== null && file.size > maxSize;

  return (
    <>
      <button
        type="button"
        className="upload-drop"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          onPick(event.dataTransfer.files?.[0] ?? null);
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 16V4M8 8l4-4 4 4" />
          <path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" />
        </svg>
        <span className="upload-drop-title">
          {file ? file.name : "Pilih file atau tarik ke sini"}
        </span>
        <span className="upload-drop-hint">
          {file
            ? formatFileSize(file.size)
            : `PDF, DOC, PPT, atau MP4 — maksimal ${formatFileSize(maxSize)}`}
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_FILES}
        className="d-none"
        onChange={(event) => onPick(event.target.files?.[0] ?? null)}
      />

      {tooBig ? (
        <p className="field-error mt-2 mb-0">
          Ukuran file melebihi {formatFileSize(maxSize)}.
        </p>
      ) : null}

      {file && !tooBig ? (
        <button
          type="button"
          className="btn-link-danger mt-2"
          onClick={() => onPick(null)}
        >
          Hapus file
        </button>
      ) : null}
    </>
  );
}

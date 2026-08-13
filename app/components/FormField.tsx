"use client";

import type { ReactNode } from "react";

type FieldProps = {
  label: string;
  hint?: string;
  required?: boolean;
  col?: string;
  children: ReactNode;
};

/** Label + control block shared by the create-test form and the modals built from it. */
export function Field({
  label,
  hint,
  required,
  col = "col-12",
  children,
}: FieldProps) {
  return (
    <div className={col}>
      <label className="form-label">
        {label}
        {required ? <span className="form-required"> *</span> : null}
      </label>
      {children}
      {hint ? <p className="field-hint">{hint}</p> : null}
    </div>
  );
}

type CheckFieldProps = {
  id: string;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function CheckField({
  id,
  label,
  hint,
  checked,
  onChange,
}: CheckFieldProps) {
  return (
    <div className="check-field">
      <input
        id={id}
        type="checkbox"
        className="form-check-input mt-0"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <label htmlFor={id}>
        <span className="check-field-label">{label}</span>
        {hint ? <span className="field-hint d-block">{hint}</span> : null}
      </label>
    </div>
  );
}

type TestSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: { id: string; code: string; title: string }[];
};

export function TestSelect({ value, onChange, options }: TestSelectProps) {
  return (
    <select
      className="form-select"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="" disabled>
        Pilih tes
      </option>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.code} — {option.title}
        </option>
      ))}
    </select>
  );
}

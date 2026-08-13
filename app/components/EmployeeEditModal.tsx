"use client";

import { useEffect, useState } from "react";
import { Field } from "./FormField";
import { Modal } from "./Modal";
import {
  DEPARTMENTS,
  OUTLETS,
  POSITIONS,
  type EmployeeRow,
} from "../lib/employees";

/** The editable slice of an employee profile — the training data is untouched. */
export type EmployeeProfile = Pick<
  EmployeeRow,
  | "nik"
  | "name"
  | "position"
  | "department"
  | "outlet"
  | "dateOfBirth"
  | "gender"
  | "phone"
  | "email"
  | "address"
>;

type Props = {
  open: boolean;
  employee: EmployeeRow | null;
  onClose: () => void;
  onSave: (id: string, profile: EmployeeProfile) => void;
};

function profileOf(employee: EmployeeRow): EmployeeProfile {
  return {
    nik: employee.nik,
    name: employee.name,
    position: employee.position,
    department: employee.department,
    outlet: employee.outlet,
    dateOfBirth: employee.dateOfBirth,
    gender: employee.gender,
    phone: employee.phone,
    email: employee.email,
    address: employee.address,
  };
}

export function EmployeeEditModal({ open, employee, onClose, onSave }: Props) {
  const [form, setForm] = useState<EmployeeProfile | null>(null);

  // Load a fresh copy of the profile whenever a different employee is opened.
  useEffect(() => {
    setForm(employee ? profileOf(employee) : null);
  }, [employee]);

  if (!open || !employee || !form) return null;

  function patch(next: Partial<EmployeeProfile>) {
    setForm((current) => (current ? { ...current, ...next } : current));
  }

  const canSave =
    form.name.trim() !== "" &&
    form.nik.trim() !== "" &&
    form.position.trim() !== "" &&
    form.phone.trim() !== "";

  function save() {
    if (!canSave || !employee || !form) return;
    onSave(employee.id, form);
    onClose();
  }

  return (
    <Modal
      open={open}
      size="lg"
      title="Edit Employee"
      subtitle={`Adjust the profile of ${employee.name}`}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-brand"
            onClick={save}
            disabled={!canSave}
          >
            Save Changes
          </button>
        </>
      }
    >
      <div className="row g-3">
        <Field label="Employee Number" required col="col-md-6">
          <input
            type="text"
            className="form-control"
            value={form.nik}
            onChange={(event) => patch({ nik: event.target.value })}
          />
        </Field>

        <Field label="Full Name" required col="col-md-6">
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(event) => patch({ name: event.target.value })}
          />
        </Field>

        <Field label="Position" required col="col-md-6">
          <select
            className="form-select"
            value={form.position}
            onChange={(event) => patch({ position: event.target.value })}
          >
            {POSITIONS.map((position) => (
              <option key={position}>{position}</option>
            ))}
          </select>
        </Field>

        <Field label="Department" col="col-md-6">
          <select
            className="form-select"
            value={form.department}
            onChange={(event) => patch({ department: event.target.value })}
          >
            {DEPARTMENTS.map((department) => (
              <option key={department}>{department}</option>
            ))}
          </select>
        </Field>

        <Field label="Outlet / Placement" col="col-md-6">
          <select
            className="form-select"
            value={form.outlet}
            onChange={(event) => patch({ outlet: event.target.value })}
          >
            {OUTLETS.map((outlet) => (
              <option key={outlet}>{outlet}</option>
            ))}
          </select>
        </Field>

        <Field label="Date of Birth" col="col-md-3">
          <input
            type="date"
            className="form-control"
            value={form.dateOfBirth}
            onChange={(event) => patch({ dateOfBirth: event.target.value })}
          />
        </Field>

        <Field label="Gender" col="col-md-3">
          <select
            className="form-select"
            value={form.gender}
            onChange={(event) =>
              patch({ gender: event.target.value as EmployeeProfile["gender"] })
            }
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </Field>

        <Field label="Handphone Number" required col="col-md-6">
          <input
            type="tel"
            className="form-control"
            placeholder="08xx-xxxx-xxxx"
            value={form.phone}
            onChange={(event) => patch({ phone: event.target.value })}
          />
        </Field>

        <Field label="Email" col="col-md-6">
          <input
            type="email"
            className="form-control"
            value={form.email}
            onChange={(event) => patch({ email: event.target.value })}
          />
        </Field>

        <Field label="Address" col="col-12">
          <textarea
            className="form-control"
            rows={3}
            value={form.address}
            onChange={(event) => patch({ address: event.target.value })}
          />
        </Field>
      </div>
    </Modal>
  );
}

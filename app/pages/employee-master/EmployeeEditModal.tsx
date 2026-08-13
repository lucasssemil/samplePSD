"use client";

import { useEffect, useState } from "react";
import { Field } from "../../components/FormField";
import { Modal } from "../../components/Modal";
import {
  DEPARTMENTS,
  OUTLETS,
  POSITIONS,
  STAFF_LEVELS,
  type EmployeeRow,
} from "../../lib/employees";

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
  | "staffLevel"
  | "active"
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
    staffLevel: employee.staffLevel,
    active: employee.active,
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
      title="Ubah Data Karyawan"
      subtitle={`Perbarui profil ${employee.name}`}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Batal
          </button>
          <button
            type="button"
            className="btn-brand"
            onClick={save}
            disabled={!canSave}
          >
            Simpan Perubahan
          </button>
        </>
      }
    >
      <div className="row g-3">
        <Field label="Nomor Karyawan" required col="col-md-6">
          <input
            type="text"
            className="form-control"
            value={form.nik}
            onChange={(event) => patch({ nik: event.target.value })}
          />
        </Field>

        <Field label="Nama Lengkap" required col="col-md-6">
          <input
            type="text"
            className="form-control"
            value={form.name}
            onChange={(event) => patch({ name: event.target.value })}
          />
        </Field>

        <Field label="Jabatan" required col="col-md-6">
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

        <Field label="Departemen" col="col-md-6">
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

        <Field label="Outlet / Penempatan" col="col-md-6">
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

        <Field label="Tanggal Lahir" col="col-md-3">
          <input
            type="date"
            className="form-control"
            value={form.dateOfBirth}
            onChange={(event) => patch({ dateOfBirth: event.target.value })}
          />
        </Field>

        <Field label="Jenis Kelamin" col="col-md-3">
          <select
            className="form-select"
            value={form.gender}
            onChange={(event) =>
              patch({ gender: event.target.value as EmployeeProfile["gender"] })
            }
          >
            <option value="Male">Laki-laki</option>
            <option value="Female">Perempuan</option>
          </select>
        </Field>

        <Field label="Nomor Handphone" required col="col-md-6">
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

        <Field label="Level Staf" col="col-md-6">
          <select
            className="form-select"
            value={form.staffLevel}
            onChange={(event) =>
              patch({
                staffLevel: event.target.value as EmployeeProfile["staffLevel"],
              })
            }
          >
            {STAFF_LEVELS.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </Field>

        <Field label="Status Karyawan" col="col-md-6">
          <select
            className="form-select"
            value={form.active ? "active" : "inactive"}
            onChange={(event) =>
              patch({ active: event.target.value === "active" })
            }
          >
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
        </Field>

        <Field label="Alamat" col="col-12">
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

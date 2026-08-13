"use client";

import { useEffect, useState } from "react";
import { Field } from "./FormField";
import { Modal } from "./Modal";
import { RESIGN_CATEGORIES, type ResignCategory } from "../lib/resignations";

export type ResignSubmission = {
  category: ResignCategory;
  resignDate: string;
  reason: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (submission: ResignSubmission) => void;
};

export function ResignFormModal({ open, onClose, onSubmit }: Props) {
  const [category, setCategory] = useState<ResignCategory | "">("");
  const [resignDate, setResignDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setCategory("");
      setResignDate("");
      setReason("");
    }
  }, [open]);

  const canSubmit =
    category !== "" && resignDate !== "" && reason.trim() !== "";

  function submit() {
    if (!canSubmit) return;
    onSubmit({
      category: category as ResignCategory,
      resignDate,
      reason: reason.trim(),
    });
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Form Resign"
      subtitle="Ajukan permohonan pengunduran diri ke HR"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Batal
          </button>
          <button
            type="button"
            className="btn-brand"
            onClick={submit}
            disabled={!canSubmit}
          >
            Kirim Form
          </button>
        </>
      }
    >
      <div className="row g-3">
        <Field label="Kategori" required col="col-md-6">
          <select
            className="form-select"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as ResignCategory)
            }
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            {RESIGN_CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Tanggal Resign"
          required
          col="col-md-6"
          hint="Rencana hari kerja terakhir Anda."
        >
          <input
            type="date"
            className="form-control"
            value={resignDate}
            onChange={(event) => setResignDate(event.target.value)}
          />
        </Field>

        <Field label="Alasan" required col="col-12">
          <textarea
            className="form-control"
            rows={4}
            placeholder="Jelaskan alasan pengunduran diri Anda..."
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
        </Field>
      </div>
    </Modal>
  );
}

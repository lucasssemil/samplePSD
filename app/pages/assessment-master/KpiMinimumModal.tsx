"use client";

import { useEffect, useState } from "react";
import { Field } from "../../components/FormField";
import { Modal } from "../../components/Modal";
import type { KpiMinimum } from "../../lib/kpiMinimum";

type Props = {
  open: boolean;
  item: KpiMinimum | null;
  onClose: () => void;
  onSave: (level: KpiMinimum["level"], minScore: number) => void;
};

/** Small popup that edits one number: the minimum KPI score for a level. */
export function KpiMinimumModal({ open, item, onClose, onSave }: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(item ? String(item.minScore) : "");
  }, [item]);

  if (!open || !item) return null;

  const parsed = Number(value);
  const valid =
    value !== "" && Number.isFinite(parsed) && parsed >= 0 && parsed <= 100;

  function save() {
    if (!valid || !item) return;
    onSave(item.level, parsed);
    onClose();
  }

  return (
    <Modal
      open={open}
      size="sm"
      title="Ubah Minimum KPI"
      subtitle={`Level ${item.level}`}
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
            disabled={!valid}
          >
            Simpan
          </button>
        </>
      }
    >
      <div className="row g-3">
        <Field
          label="Minimum Skor KPI"
          required
          col="col-12"
          hint="Angka 0 sampai 100."
        >
          <input
            type="number"
            className="form-control"
            min={0}
            max={100}
            value={value}
            autoFocus
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") save();
            }}
          />
        </Field>

        {value !== "" && !valid ? (
          <div className="col-12">
            <p className="field-error mb-0">
              Minimum skor harus angka antara 0 dan 100.
            </p>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

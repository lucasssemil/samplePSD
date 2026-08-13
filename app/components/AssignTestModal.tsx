"use client";

import { useEffect, useState } from "react";
import { CheckField, Field, TestSelect } from "./FormField";
import { Modal } from "./Modal";
import { TEST_LIST } from "../lib/tests";

export type AssignPayload = {
  testId: string;
  useDateRange: boolean;
  startDate: string;
  endDate: string;
  required: boolean;
};

type Props = {
  open: boolean;
  employeeName?: string;
  onClose: () => void;
  onSubmit?: (payload: AssignPayload) => void;
};

const EMPTY: AssignPayload = {
  testId: "",
  useDateRange: false,
  startDate: "",
  endDate: "",
  required: false,
};

export function AssignTestModal({
  open,
  employeeName,
  onClose,
  onSubmit,
}: Props) {
  const [form, setForm] = useState<AssignPayload>(EMPTY);

  // Reset the form each time the dialog opens so it never carries over an
  // earlier employee's selection.
  useEffect(() => {
    if (open) setForm(EMPTY);
  }, [open]);

  function patch(next: Partial<AssignPayload>) {
    setForm((current) => ({ ...current, ...next }));
  }

  const dateRangeInvalid =
    form.useDateRange &&
    form.startDate !== "" &&
    form.endDate !== "" &&
    form.endDate < form.startDate;

  const canSubmit =
    form.testId !== "" &&
    !dateRangeInvalid &&
    (!form.useDateRange || (form.startDate !== "" && form.endDate !== ""));

  function submit() {
    if (!canSubmit) return;
    onSubmit?.(form);
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Tugaskan Tes"
      subtitle={
        employeeName
          ? `Tugaskan tes kepada ${employeeName}`
          : "Tugaskan tes ke karyawan terpilih"
      }
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
            Tugaskan Tes
          </button>
        </>
      }
    >
      <div className="row g-3">
        <Field label="Tes" required>
          <TestSelect
            value={form.testId}
            onChange={(testId) => patch({ testId })}
            options={TEST_LIST}
          />
        </Field>

        <div className="col-12">
          <CheckField
            id="assign-date-range"
            label="Atur rentang tanggal pelatihan"
            hint="Biarkan kosong agar karyawan bisa mengerjakan kapan saja."
            checked={form.useDateRange}
            onChange={(useDateRange) =>
              patch(
                useDateRange
                  ? { useDateRange }
                  : { useDateRange, startDate: "", endDate: "" }
              )
            }
          />
        </div>

        <Field label="Mulai Pelatihan" col="col-md-6">
          <input
            type="date"
            className="form-control"
            value={form.startDate}
            disabled={!form.useDateRange}
            onChange={(event) => patch({ startDate: event.target.value })}
          />
        </Field>

        <Field label="Selesai Pelatihan" col="col-md-6">
          <input
            type="date"
            className="form-control"
            value={form.endDate}
            disabled={!form.useDateRange}
            min={form.startDate || undefined}
            onChange={(event) => patch({ endDate: event.target.value })}
          />
        </Field>

        {dateRangeInvalid ? (
          <div className="col-12">
            <p className="field-error mb-0">
              Tanggal selesai harus sama atau setelah tanggal mulai.
            </p>
          </div>
        ) : null}

        <div className="col-12">
          <CheckField
            id="assign-required"
            label="Tandai pelatihan ini sebagai wajib"
            hint="Pelatihan wajib dihitung dalam laporan kepatuhan karyawan."
            checked={form.required}
            onChange={(required) => patch({ required })}
          />
        </div>
      </div>
    </Modal>
  );
}

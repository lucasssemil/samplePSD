"use client";

import { useEffect, useState } from "react";
import { Field } from "./FormField";
import { Modal } from "./Modal";

export type ResignSubmission = {
  resignDate: string;
  reason: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (submission: ResignSubmission) => void;
};

export function ResignFormModal({ open, onClose, onSubmit }: Props) {
  const [resignDate, setResignDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open) {
      setResignDate("");
      setReason("");
    }
  }, [open]);

  const canSubmit = resignDate !== "" && reason.trim() !== "";

  function submit() {
    if (!canSubmit) return;
    onSubmit({ resignDate, reason: reason.trim() });
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Resign Form"
      subtitle="Submit your resignation request to HR"
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-brand"
            onClick={submit}
            disabled={!canSubmit}
          >
            Submit Form
          </button>
        </>
      }
    >
      <div className="row g-3">
        <Field
          label="Resign Date"
          required
          col="col-md-6"
          hint="Your intended last working day."
        >
          <input
            type="date"
            className="form-control"
            value={resignDate}
            onChange={(event) => setResignDate(event.target.value)}
          />
        </Field>

        <Field label="Reason" required col="col-12">
          <textarea
            className="form-control"
            rows={4}
            placeholder="Explain the reason for your resignation..."
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
        </Field>
      </div>
    </Modal>
  );
}

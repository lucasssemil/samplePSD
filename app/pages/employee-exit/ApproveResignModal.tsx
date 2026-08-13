"use client";

import { useEffect, useState } from "react";
import { Field } from "../../components/FormField";
import { Modal } from "../../components/Modal";
import { formatIsoDate } from "../../lib/employees";
import {
  resignCategoryClass,
  resignStatusClass,
  type ResignLetter,
} from "../../lib/resignations";

export type ApprovalPayload = {
  exitInterviewDate: string;
  onboardingPlanDate: string;
};

type Props = {
  open: boolean;
  letter: ResignLetter | null;
  employeeName: string;
  onClose: () => void;
  onApprove: (letterId: string, payload: ApprovalPayload) => void;
};

export function ApproveResignModal({
  open,
  letter,
  employeeName,
  onClose,
  onApprove,
}: Props) {
  const [exitInterviewDate, setExitInterviewDate] = useState("");
  const [onboardingPlanDate, setOnboardingPlanDate] = useState("");

  // Load the stored dates when an already approved letter is reopened.
  useEffect(() => {
    setExitInterviewDate(letter?.exitInterviewDate ?? "");
    setOnboardingPlanDate(letter?.onboardingPlanDate ?? "");
  }, [letter]);

  if (!open || !letter) return null;

  const canApprove = exitInterviewDate !== "" && onboardingPlanDate !== "";
  const approved = letter.status === "Disetujui";

  function approve() {
    if (!canApprove || !letter) return;
    onApprove(letter.id, { exitInterviewDate, onboardingPlanDate });
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Surat Resign"
      subtitle={`Dikirim oleh ${employeeName}`}
      onClose={onClose}
      footer={
        <>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Tutup
          </button>
          <button
            type="button"
            className="btn-brand"
            onClick={approve}
            disabled={!canApprove}
          >
            {approved ? "Perbarui Persetujuan" : "Setujui"}
          </button>
        </>
      }
    >
      <div className="row g-3">
        <div className="col-12">
          <div className="notice-card">
            <div className="d-flex align-items-center gap-2 flex-wrap mb-2">
              <span className={resignCategoryClass(letter.category)}>
                {letter.category}
              </span>
              <span className={resignStatusClass(letter.status)}>
                {letter.status}
              </span>
              <span className="score-date">
                Dikirim {letter.submittedAt}
              </span>
            </div>
            <p className="mb-1">
              <strong>Tanggal resign:</strong> {formatIsoDate(letter.resignDate)}
            </p>
            <p className="sentiment-note mb-0">{letter.reason}</p>
          </div>
        </div>

        <Field
          label="Tanggal Exit Interview"
          required
          col="col-md-6"
          hint="Dijadwalkan bersama HR sebelum hari kerja terakhir."
        >
          <input
            type="date"
            className="form-control"
            value={exitInterviewDate}
            onChange={(event) => setExitInterviewDate(event.target.value)}
          />
        </Field>

        <Field
          label="Tanggal Rencana Onboarding"
          required
          col="col-md-6"
          hint="Kapan onboarding pengganti dimulai."
        >
          <input
            type="date"
            className="form-control"
            value={onboardingPlanDate}
            onChange={(event) => setOnboardingPlanDate(event.target.value)}
          />
        </Field>

        {!canApprove ? (
          <div className="col-12">
            <p className="field-hint mt-0 mb-0">
              Kedua tanggal wajib diisi sebelum surat dapat disetujui.
            </p>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}

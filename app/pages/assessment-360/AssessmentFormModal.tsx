"use client";

import { useEffect, useState } from "react";
import { Field } from "../../components/FormField";
import { Modal } from "../../components/Modal";
import {
  ASSESSMENT_CATEGORIES,
  formatMonth,
  overallScore,
  type AssessmentCategoryKey,
  type AssessmentScores,
} from "../../lib/assessments";

export type AssessmentSubmission = {
  month: string;
  scores: AssessmentScores;
  notes: string;
};

type Props = {
  open: boolean;
  subtitle: string;
  /** Months already submitted — one assessment per month. */
  takenMonths: string[];
  onClose: () => void;
  onSubmit: (submission: AssessmentSubmission) => void;
};

type Draft = Record<AssessmentCategoryKey, string>;

const EMPTY_DRAFT = ASSESSMENT_CATEGORIES.reduce((draft, category) => {
  draft[category.key] = "";
  return draft;
}, {} as Draft);

function parse(value: string) {
  if (value === "") return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) return null;
  return parsed;
}

export function AssessmentFormModal({
  open,
  subtitle,
  takenMonths,
  onClose,
  onSubmit,
}: Props) {
  const [month, setMonth] = useState("");
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!open) return;
    setMonth("");
    setDraft(EMPTY_DRAFT);
    setNotes("");
  }, [open]);

  const parsed = ASSESSMENT_CATEGORIES.map((category) => ({
    category,
    value: parse(draft[category.key]),
    raw: draft[category.key],
  }));

  const invalid = parsed.some((item) => item.raw !== "" && item.value === null);
  const complete = parsed.every((item) => item.value !== null);
  const duplicate = takenMonths.includes(month);
  const canSubmit = month !== "" && complete && !invalid && !duplicate;

  const preview = complete
    ? overallScore(
        parsed.reduce((scores, item) => {
          scores[item.category.key] = item.value as number;
          return scores;
        }, {} as AssessmentScores)
      )
    : null;

  function submit() {
    if (!canSubmit) return;
    onSubmit({
      month,
      scores: parsed.reduce((scores, item) => {
        scores[item.category.key] = item.value as number;
        return scores;
      }, {} as AssessmentScores),
      notes: notes.trim(),
    });
    onClose();
  }

  return (
    <Modal
      open={open}
      size="lg"
      title="Tambah Review Bulanan"
      subtitle={subtitle}
      onClose={onClose}
      footer={
        <>
          {preview !== null ? (
            <span className="me-auto text-secondary" style={{ fontSize: 13.5 }}>
              Skor KPI bulan ini: <strong>{preview}</strong>
            </span>
          ) : null}
          <button type="button" className="btn-ghost" onClick={onClose}>
            Batal
          </button>
          <button
            type="button"
            className="btn-brand"
            onClick={submit}
            disabled={!canSubmit}
          >
            Simpan Review
          </button>
        </>
      }
    >
      <div className="row g-3">
        <Field
          label="Bulan Review"
          required
          col="col-md-6"
          hint="Bulan saat review dilakukan."
        >
          <input
            type="month"
            className="form-control"
            value={month}
            onChange={(event) => setMonth(event.target.value)}
          />
        </Field>

        {duplicate ? (
          <div className="col-12">
            <p className="field-error mb-0">
              {formatMonth(month)} sudah pernah diinput.
            </p>
          </div>
        ) : null}

        <div className="col-12">
          <p className="form-label mb-2">
            Skor per Kategori <span className="form-required">*</span>
          </p>
          <div className="row g-3">
            {ASSESSMENT_CATEGORIES.map((category) => (
              <div className="col-md-4" key={category.key}>
                <label className="form-label" htmlFor={`score-${category.key}`}>
                  {category.label}
                </label>
                <input
                  id={`score-${category.key}`}
                  type="number"
                  className="form-control"
                  min={0}
                  max={100}
                  placeholder="0 - 100"
                  value={draft[category.key]}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      [category.key]: event.target.value,
                    }))
                  }
                />
              </div>
            ))}
          </div>
          {invalid ? (
            <p className="field-error mt-2 mb-0">
              Setiap skor kategori harus angka antara 0 dan 100.
            </p>
          ) : (
            <p className="field-hint">
              Skor KPI bulan ini adalah rata-rata dari lima kategori di atas.
            </p>
          )}
        </div>

        <Field label="Catatan" col="col-12">
          <textarea
            className="form-control"
            rows={3}
            placeholder="Catatan singkat tentang review ini..."
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </Field>
      </div>
    </Modal>
  );
}

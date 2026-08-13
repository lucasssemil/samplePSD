"use client";

import { useState } from "react";
import { Field } from "./FormField";

import {
  SURVEY_CATEGORIES,
  surveyCategoryClass,
  surveysOf,
  type SurveyCategory,
  type SurveyEntry,
} from "../lib/surveys";

const TODAY = "13 Agu 2026";

type Props = {
  employeeId: string;
};

export function UserSurvey({ employeeId }: Props) {
  const [history, setHistory] = useState<SurveyEntry[]>(() =>
    [...surveysOf(employeeId)].reverse()
  );
  const [category, setCategory] = useState<SurveyCategory | "">("");
  const [notes, setNotes] = useState("");
  const [justSent, setJustSent] = useState(false);

  const canSubmit = category !== "" && notes.trim() !== "";

  function submit() {
    if (!canSubmit) return;
    setHistory((current) => [
      {
        id: `s-${Date.now()}`,
        employeeId,
        category: category as SurveyCategory,
        // Sentiment is classified by HR after the survey is received.
        sentiment: "Negatif",
        submittedAt: TODAY,
        notes: notes.trim(),
      },
      ...current,
    ]);
    setCategory("");
    setNotes("");
    setJustSent(true);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Employee Company Survey</h1>
          <p className="page-sub">
            Sampaikan ke HR apa yang sudah baik dan apa yang perlu diperbaiki
          </p>
        </div>
      </div>

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">Form Survei</h2>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <Field label="Kategori" required col="col-md-5">
              <select
                className="form-select"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value as SurveyCategory);
                  setJustSent(false);
                }}
              >
                <option value="" disabled>
                  Pilih kategori
                </option>
                {SURVEY_CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Catatan"
              required
              col="col-12"
              hint="Tulis sedetail mungkin — sebutkan outlet, shift, atau barangnya."
            >
              <textarea
                className="form-control"
                rows={4}
                placeholder="Tulis masukan Anda di sini..."
                value={notes}
                onChange={(event) => {
                  setNotes(event.target.value);
                  setJustSent(false);
                }}
              />
            </Field>

            {justSent ? (
              <div className="col-12">
                <div className="notice-card">
                  <span className="badge-status badge-published">
                    Survei terkirim
                  </span>
                  <p className="sentiment-note mb-0 mt-2">
                    Terima kasih. Survei Anda sudah dikirim ke HR dan masuk ke
                    riwayat di bawah.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="panel-foot justify-content-end">
          <button
            type="button"
            className="btn-brand"
            onClick={submit}
            disabled={!canSubmit}
          >
            Kirim Survei
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Riwayat Survei Terkirim</h2>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0 data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th style={{ width: 160 }}>Kategori</th>
                <th style={{ width: 150 }}>Dikirim</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={entry.id}>
                  <td className="text-secondary">{index + 1}</td>
                  <td>
                    <span className={surveyCategoryClass(entry.category)}>
                      {entry.category}
                    </span>
                  </td>
                  <td className="text-secondary">{entry.submittedAt}</td>
                  <td className="survey-notes">{entry.notes}</td>
                </tr>
              ))}

              {history.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 empty-text">
                    Anda belum pernah mengirim survei.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="panel-foot">
          <span className="text-secondary">
            {history.length} survei terkirim
          </span>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import { Field } from "./FormField";
import { CURRENT_EMPLOYEE_ID } from "../lib/employees";
import {
  SURVEY_CATEGORIES,
  surveyCategoryClass,
  surveysOf,
  type SurveyCategory,
  type SurveyEntry,
} from "../lib/surveys";

const TODAY = "13 Aug 2026";

export function UserSurvey() {
  const [history, setHistory] = useState<SurveyEntry[]>(() =>
    [...surveysOf(CURRENT_EMPLOYEE_ID)].reverse()
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
        employeeId: CURRENT_EMPLOYEE_ID,
        category: category as SurveyCategory,
        // Sentiment is classified by HR after the survey is received.
        sentiment: "Negative",
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
            Tell HR what is working and what needs attention
          </p>
        </div>
      </div>

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">Survey Form</h2>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <Field label="Category" required col="col-md-5">
              <select
                className="form-select"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value as SurveyCategory);
                  setJustSent(false);
                }}
              >
                <option value="" disabled>
                  Select category
                </option>
                {SURVEY_CATEGORIES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Notes"
              required
              col="col-12"
              hint="Be specific — mention the outlet, shift or item involved."
            >
              <textarea
                className="form-control"
                rows={4}
                placeholder="Write your feedback here..."
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
                    Survey submitted
                  </span>
                  <p className="sentiment-note mb-0 mt-2">
                    Thank you. Your survey has been sent to HR and added to the
                    history below.
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
            Submit Survey
          </button>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">History Survey Submitted</h2>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0 data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th style={{ width: 160 }}>Category</th>
                <th style={{ width: 150 }}>Submitted</th>
                <th>Notes</th>
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
                    You have not submitted any survey yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="panel-foot">
          <span className="text-secondary">
            {history.length} survey submitted
          </span>
        </div>
      </section>
    </>
  );
}

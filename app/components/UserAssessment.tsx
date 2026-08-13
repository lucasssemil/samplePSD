"use client";

import { useState } from "react";
import {
  AssessmentFormModal,
  type AssessmentSubmission,
} from "./AssessmentFormModal";
import { LineChart, type Point } from "./LineChart";
import {
  ASSESSMENT_CATEGORIES,
  ASSESSMENT_HISTORY,
  formatMonth,
  overallScore,
  shortMonth,
  type AssessmentEntry,
} from "../lib/assessments";
import { kpiBand, kpiBandClass } from "../lib/employees";

const TODAY = "13 Aug 2026";

export function UserAssessment() {
  const [entries, setEntries] = useState<AssessmentEntry[]>(ASSESSMENT_HISTORY);
  const [formOpen, setFormOpen] = useState(false);

  const sorted = [...entries].sort((a, b) => a.month.localeCompare(b.month));

  const points: Point[] = sorted.map((entry) => ({
    key: entry.id,
    label: shortMonth(entry.month),
    value: entry.score,
    tooltip: `${formatMonth(entry.month)}: ${entry.score}`,
  }));

  const latest = sorted[sorted.length - 1];

  function add(submission: AssessmentSubmission) {
    setEntries((current) => [
      ...current,
      {
        id: `as-${Date.now()}`,
        month: submission.month,
        scores: submission.scores,
        score: overallScore(submission.scores),
        notes: submission.notes,
        submittedAt: TODAY,
      },
    ]);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">360 Assessment</h1>
          <p className="page-sub">
            Record the month your assessment was completed and track your score
          </p>
        </div>

        <button
          type="button"
          className="btn-brand"
          onClick={() => setFormOpen(true)}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Assessment
        </button>
      </div>

      {latest ? (
        <div className="row g-3 mb-4">
          {ASSESSMENT_CATEGORIES.map((category) => (
            <div className="col-6 col-lg" key={category.key}>
              <div className="stat-card">
                <span className="stat-label">{category.label}</span>
                <span className="stat-value">{latest.scores[category.key]}</span>
                <span className="field-hint mt-0">
                  {formatMonth(latest.month)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">KPI Score per Month</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Average of the five categories, per submitted month
          </span>
        </div>
        <div className="panel-body">
          <LineChart points={points} />
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">History Assessment</h2>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0 data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th>Month</th>
                {ASSESSMENT_CATEGORIES.map((category) => (
                  <th className="text-center" key={category.key}>
                    {category.short}
                  </th>
                ))}
                <th className="text-center">KPI Score</th>
                <th>Status</th>
                <th>Submitted</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {[...sorted].reverse().map((entry, index) => {
                const band = kpiBand(entry.score);
                return (
                  <tr key={entry.id}>
                    <td className="text-secondary">{index + 1}</td>
                    <td className="fw-semibold">{formatMonth(entry.month)}</td>
                    {ASSESSMENT_CATEGORIES.map((category) => (
                      <td className="text-center" key={category.key}>
                        {entry.scores[category.key]}
                      </td>
                    ))}
                    <td className="text-center fw-semibold">{entry.score}</td>
                    <td>
                      <span className={kpiBandClass(band)}>{band}</span>
                    </td>
                    <td className="text-secondary">{entry.submittedAt}</td>
                    <td className="survey-notes">
                      {entry.notes || <span className="empty-text">—</span>}
                    </td>
                  </tr>
                );
              })}

              {sorted.length === 0 ? (
                <tr>
                  <td
                    colSpan={ASSESSMENT_CATEGORIES.length + 6}
                    className="text-center py-4 empty-text"
                  >
                    No assessment submitted yet. Use Add Assessment to record
                    one.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="panel-foot">
          <span className="text-secondary">
            {sorted.length} assessment submitted
          </span>
        </div>
      </section>

      <AssessmentFormModal
        open={formOpen}
        takenMonths={entries.map((entry) => entry.month)}
        onClose={() => setFormOpen(false)}
        onSubmit={add}
      />
    </>
  );
}

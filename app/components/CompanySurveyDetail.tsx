"use client";

import { useMemo, useState } from "react";
import type { EmployeeRow } from "../lib/employees";
import {
  SURVEY_CATEGORIES,
  surveyCategoryClass,
  surveysOf,
  type SurveyCategory,
} from "../lib/surveys";

type Props = {
  employee: EmployeeRow | undefined;
  onBack: () => void;
};

type Filter = SurveyCategory | "All";

export function CompanySurveyDetail({ employee, onBack }: Props) {
  const [filter, setFilter] = useState<Filter>("All");

  const entries = useMemo(
    () => (employee ? surveysOf(employee.id) : []),
    [employee]
  );

  const rows = useMemo(
    () =>
      filter === "All"
        ? entries
        : entries.filter((entry) => entry.category === filter),
    [entries, filter]
  );

  if (!employee) {
    return (
      <>
        <div className="page-head">
          <button type="button" className="btn-ghost" onClick={onBack}>
            Back to employee list
          </button>
        </div>
        <section className="panel panel-empty">
          <p className="empty-text mb-0">Employee not found.</p>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-head">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn-back"
            onClick={onBack}
            aria-label="Back to employee list"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <div>
            <h1 className="page-title">{employee.name}</h1>
            <p className="page-sub">
              {employee.nik} &middot; {employee.position} &middot;{" "}
              {employee.department}
            </p>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {SURVEY_CATEGORIES.map((category) => (
          <div className="col-6 col-lg-3" key={category}>
            <div className="stat-card">
              <span className="stat-label">{category}</span>
              <span className="stat-value">
                {entries.filter((entry) => entry.category === category).length}
              </span>
            </div>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Survey Submitted</h2>
          <div className="phase-tabs" role="tablist" aria-label="Survey category">
            {(["All", ...SURVEY_CATEGORIES] as Filter[]).map((value) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={filter === value}
                className={`phase-tab${filter === value ? " active" : ""}`}
                onClick={() => setFilter(value)}
              >
                {value}
              </button>
            ))}
          </div>
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
              {rows.map((entry, index) => (
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

              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 empty-text">
                    {entries.length === 0
                      ? "This employee has not filled any survey yet."
                      : `No ${filter} survey from this employee.`}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="panel-foot">
          <span className="text-secondary">
            Showing {rows.length} of {entries.length} survey entries
          </span>
        </div>
      </section>
    </>
  );
}

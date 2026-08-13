"use client";

import { useState } from "react";
import { AssignTestModal } from "./AssignTestModal";
import {
  ageFromIso,
  attemptStatusClass,
  completionOf,
  formatIsoDate,
  type Attempt,
  type AssignedTest,
  type EmployeeRow,
} from "../lib/employees";

type Props = {
  employee: EmployeeRow | undefined;
  onBack: () => void;
};

function ScoreCell({ attempt, passingScore }: { attempt: Attempt; passingScore: number }) {
  return (
    <div className="score-cell">
      <span className={attemptStatusClass(attempt.status)}>{attempt.status}</span>
      <span className="score-value">
        {attempt.score === null ? (
          <span className="text-secondary">&mdash;</span>
        ) : (
          <>
            {attempt.score}
            <span className="score-total">/{passingScore} pass</span>
          </>
        )}
      </span>
      {attempt.submittedAt ? (
        <span className="score-date">{attempt.submittedAt}</span>
      ) : null}
    </div>
  );
}

function improvementOf(item: AssignedTest) {
  if (item.preTest.score === null || item.postTest.score === null) return null;
  return item.postTest.score - item.preTest.score;
}

export function EmployeeTrainingDetail({ employee, onBack }: Props) {
  const [assignOpen, setAssignOpen] = useState(false);

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

  const { done, total } = completionOf(employee);
  const passed = employee.assigned.filter(
    (item) => item.postTest.status === "Passed"
  ).length;
  const requiredCount = employee.assigned.filter((item) => item.required).length;

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

        <button
          type="button"
          className="btn-brand"
          onClick={() => setAssignOpen(true)}
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
          Assign Test
        </button>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: "Assigned Tests", value: total },
          { label: "Completed", value: `${done}/${total}` },
          { label: "Passed", value: passed },
          { label: "Required", value: requiredCount },
        ].map((stat) => (
          <div className="col-6 col-lg-3" key={stat.label}>
            <div className="stat-card">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">Employee Information</h2>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            {[
              { label: "Employee Number", value: employee.nik },
              { label: "Full Name", value: employee.name },
              { label: "Position", value: employee.position },
              { label: "Department", value: employee.department },
              { label: "Outlet", value: employee.outlet },
              { label: "Joined", value: employee.joinedAt },
              {
                label: "Date of Birth",
                value: `${formatIsoDate(employee.dateOfBirth)} (${
                  ageFromIso(employee.dateOfBirth) ?? "—"
                } yrs)`,
              },
              { label: "Handphone", value: employee.phone },
              { label: "Address", value: employee.address },
            ].map((info) => (
              <div className="col-md-4" key={info.label}>
                <span className="info-label">{info.label}</span>
                <span className="info-value">{info.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Assigned Tests</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Pre-test and post-test result per assignment
          </span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0 data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th>Test Code</th>
                <th>Test Title</th>
                <th>Training Date</th>
                <th className="text-center">Required</th>
                <th style={{ width: 170 }}>Pre-Test</th>
                <th style={{ width: 170 }}>Post-Test</th>
                <th className="text-center">Improvement</th>
              </tr>
            </thead>
            <tbody>
              {employee.assigned.map((item, index) => {
                const improvement = improvementOf(item);
                return (
                  <tr key={item.id}>
                    <td className="text-secondary">{index + 1}</td>
                    <td className="fw-semibold">{item.code}</td>
                    <td>
                      {item.title}
                      <span className="d-block text-secondary" style={{ fontSize: 12.5 }}>
                        {item.category}
                      </span>
                    </td>
                    <td className="text-secondary">
                      {item.trainingStart && item.trainingEnd ? (
                        `${item.trainingStart} — ${item.trainingEnd}`
                      ) : (
                        <span className="empty-text">No date range</span>
                      )}
                    </td>
                    <td className="text-center">
                      <span
                        className={
                          item.required
                            ? "badge-status badge-required"
                            : "badge-status badge-archived"
                        }
                      >
                        {item.required ? "Required" : "Optional"}
                      </span>
                    </td>
                    <td>
                      <ScoreCell
                        attempt={item.preTest}
                        passingScore={item.passingScore}
                      />
                    </td>
                    <td>
                      <ScoreCell
                        attempt={item.postTest}
                        passingScore={item.passingScore}
                      />
                    </td>
                    <td className="text-center">
                      {improvement === null ? (
                        <span className="text-secondary">&mdash;</span>
                      ) : (
                        <span
                          className={
                            improvement >= 0 ? "delta-up" : "delta-down"
                          }
                        >
                          {improvement >= 0 ? "+" : ""}
                          {improvement}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {employee.assigned.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 empty-text">
                    No test assigned to this employee yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="panel-foot">
          <span className="text-secondary">
            {total} assigned &middot; {done} completed &middot; {passed} passed
          </span>
        </div>
      </section>

      <AssignTestModal
        open={assignOpen}
        employeeName={employee.name}
        onClose={() => setAssignOpen(false)}
      />
    </>
  );
}

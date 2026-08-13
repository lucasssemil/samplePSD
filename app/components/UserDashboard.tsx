"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { ResignFormModal, type ResignSubmission } from "./ResignFormModal";
import {
  formatIsoDate,
  trainingState,
  type EmployeeRow,
} from "../lib/employees";

type Props = {
  employee: EmployeeRow | undefined;
  onOpen: (menuId: string) => void;
};

export function UserDashboard({ employee, onOpen }: Props) {
  const [resignOpen, setResignOpen] = useState(false);
  const [resign, setResign] = useState<ResignSubmission | null>(null);

  const assigned = employee?.assigned ?? [];
  const finished = assigned.filter(
    (item) => trainingState(item) === "Completed"
  ).length;

  function submitResign(submission: ResignSubmission) {
    setResign(submission);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">
            {employee ? `Welcome back, ${employee.name}` : "Employee workspace"}
          </p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="stat-card">
            <span className="stat-label">Training Assigned</span>
            <span className="stat-value">{assigned.length}</span>
            <span className="field-hint mt-0">
              Tests assigned to you by the admin
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="stat-card">
            <span className="stat-label">Training Finished</span>
            <span className="stat-value">{finished}</span>
            <span className="field-hint mt-0">
              Post-test already submitted
            </span>
          </div>
        </div>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Shortcut</h2>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-md-4">
              <button
                type="button"
                className="shortcut-card shortcut-primary"
                onClick={() => setResignOpen(true)}
              >
                <span className="shortcut-icon">
                  <Icon name="report" size={22} />
                </span>
                <span className="shortcut-text">
                  <span className="shortcut-label">Resign Form</span>
                  <span className="shortcut-sub">
                    Submit your resignation request
                  </span>
                </span>
              </button>
            </div>

            <div className="col-md-4">
              <button
                type="button"
                className="shortcut-card"
                onClick={() => onOpen("survey")}
              >
                <span className="shortcut-icon">
                  <Icon name="survey" size={22} />
                </span>
                <span className="shortcut-text">
                  <span className="shortcut-label">Survey Form</span>
                  <span className="shortcut-sub">
                    Send feedback about the company
                  </span>
                </span>
              </button>
            </div>

            <div className="col-md-4">
              <button
                type="button"
                className="shortcut-card"
                onClick={() => onOpen("assessment")}
              >
                <span className="shortcut-icon">
                  <Icon name="assessment" size={22} />
                </span>
                <span className="shortcut-text">
                  <span className="shortcut-label">360 Assessment</span>
                  <span className="shortcut-sub">
                    Input your monthly assessment
                  </span>
                </span>
              </button>
            </div>
          </div>

          {resign ? (
            <div className="notice-card mt-3">
              <span className="badge-status badge-draft">
                Resign form submitted
              </span>
              <p className="mb-1 mt-2">
                <strong>Resign date:</strong> {formatIsoDate(resign.resignDate)}
              </p>
              <p className="sentiment-note mb-0">{resign.reason}</p>
            </div>
          ) : null}
        </div>
      </section>

      <ResignFormModal
        open={resignOpen}
        onClose={() => setResignOpen(false)}
        onSubmit={submitResign}
      />
    </>
  );
}

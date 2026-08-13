"use client";

import {
  attemptStatusClass,
  trainingState,
  trainingStateClass,
  type AssignedTest,
  type EmployeeRow,
} from "../lib/employees";

type Props = {
  employee: EmployeeRow | undefined;
  onOpen: (assignmentId: string) => void;
};

function TrainingTable({
  rows,
  emptyText,
  history,
  onOpen,
}: {
  rows: AssignedTest[];
  emptyText: string;
  history: boolean;
  onOpen?: (assignmentId: string) => void;
}) {
  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0 data-table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>No</th>
            <th>Test Code</th>
            <th>Test Title</th>
            <th>Training Date</th>
            <th className="text-center">Required</th>
            <th>Pre-Test</th>
            <th>Post-Test</th>
            <th>{history ? "Result" : "Status"}</th>
            {onOpen ? <th style={{ width: 60 }}></th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => {
            const state = trainingState(item);
            return (
              <tr
                key={item.id}
                className={onOpen ? "row-clickable" : undefined}
                onClick={onOpen ? () => onOpen(item.id) : undefined}
              >
                <td className="text-secondary">{index + 1}</td>
                <td className="fw-semibold">{item.code}</td>
                <td>
                  {item.title}
                  <span
                    className="d-block text-secondary"
                    style={{ fontSize: 12.5 }}
                  >
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
                  <span className={attemptStatusClass(item.preTest.status)}>
                    {item.preTest.status}
                  </span>
                  {item.preTest.score !== null ? (
                    <span className="score-date d-block">
                      Score {item.preTest.score}
                    </span>
                  ) : null}
                </td>
                <td>
                  <span className={attemptStatusClass(item.postTest.status)}>
                    {item.postTest.status}
                  </span>
                  {item.postTest.score !== null ? (
                    <span className="score-date d-block">
                      Score {item.postTest.score}
                    </span>
                  ) : null}
                </td>
                <td>
                  <span className={trainingStateClass(state)}>{state}</span>
                </td>
                {onOpen ? (
                  <td>
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`Open ${item.title}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpen(item.id);
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 5 7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                ) : null}
              </tr>
            );
          })}

          {rows.length === 0 ? (
            <tr>
              <td colSpan={onOpen ? 9 : 8} className="text-center py-4 empty-text">
                {emptyText}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export function UserTraining({ employee, onOpen }: Props) {
  const assigned = employee?.assigned ?? [];
  const active = assigned.filter((item) => trainingState(item) === "Active");
  const history = assigned.filter((item) => trainingState(item) !== "Active");

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Training</h1>
          <p className="page-sub">Your assigned tests and training history</p>
        </div>
      </div>

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">Active Training</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Click a training to open it
          </span>
        </div>
        <TrainingTable
          rows={active}
          history={false}
          onOpen={onOpen}
          emptyText="No active training. You are all caught up."
        />
        <div className="panel-foot">
          <span className="text-secondary">{active.length} active training</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">History Training</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Completed and expired training
          </span>
        </div>
        <TrainingTable
          rows={history}
          history
          emptyText="No training history yet."
        />
        <div className="panel-foot">
          <span className="text-secondary">
            {
              history.filter((item) => trainingState(item) === "Completed")
                .length
            }{" "}
            completed &middot;{" "}
            {history.filter((item) => trainingState(item) === "Expired").length}{" "}
            expired
          </span>
        </div>
      </section>
    </>
  );
}

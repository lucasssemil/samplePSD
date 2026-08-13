"use client";

import { useMemo, useState } from "react";
import type { EmployeeRow } from "../lib/employees";
import { surveysOf } from "../lib/surveys";

type Props = {
  employees: EmployeeRow[];
  onDetail: (employeeId: string) => void;
};

export function CompanySurveyList({ employees, onDetail }: Props) {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter((employee) =>
      [employee.nik, employee.name, employee.position, employee.department]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [employees, query]);

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Employee Company Survey</h1>
          <p className="page-sub">
            Survey submitted by employees, grouped by category
          </p>
        </div>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Employee List</h2>
          <div className="table-search">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" />
            </svg>
            <input
              type="text"
              placeholder="Search employee..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0 data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th>Employee Number</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th className="text-center">Survey Filled</th>
                <th>Last Submitted</th>
                <th className="text-center" style={{ width: 120 }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((employee, index) => {
                const entries = surveysOf(employee.id);
                const last = entries[entries.length - 1];
                return (
                  <tr key={employee.id}>
                    <td className="text-secondary">{index + 1}</td>
                    <td className="fw-semibold">{employee.nik}</td>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>{employee.department}</td>
                    <td className="text-center">{entries.length}</td>
                    <td className="text-secondary">
                      {last ? (
                        last.submittedAt
                      ) : (
                        <span className="empty-text">Not filled yet</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn-ghost btn-ghost-sm"
                          onClick={() => onDetail(employee.id)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
                            <circle cx="12" cy="12" r="2.8" />
                          </svg>
                          Detail
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 empty-text">
                    No employee matches &ldquo;{query}&rdquo;.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="panel-foot">
          <span className="text-secondary">
            Showing {rows.length} of {employees.length} employees
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled">
                <span className="page-link">Prev</span>
              </li>
              <li className="page-item active">
                <span className="page-link">1</span>
              </li>
              <li className="page-item disabled">
                <span className="page-link">Next</span>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}

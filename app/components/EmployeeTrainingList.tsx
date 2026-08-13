"use client";

import { useMemo, useState } from "react";
import { AssignTestModal } from "./AssignTestModal";
import { completionOf, type EmployeeRow } from "../lib/employees";

type Props = {
  employees: EmployeeRow[];
  onDetail: (employeeId: string) => void;
};

export function EmployeeTrainingList({ employees, onDetail }: Props) {
  const [query, setQuery] = useState("");
  const [assignTo, setAssignTo] = useState<EmployeeRow | null>(null);

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
          <h1 className="page-title">Employee Training</h1>
          <p className="page-sub">
            Assign tests and monitor pre-test and post-test progress
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
                <th>NIK</th>
                <th>Name</th>
                <th>Position</th>
                <th>Department</th>
                <th>Outlet</th>
                <th className="text-center">Assigned</th>
                <th className="text-center">Completed</th>
                <th className="text-center" style={{ width: 190 }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((employee, index) => {
                const { done, total } = completionOf(employee);
                return (
                  <tr key={employee.id}>
                    <td className="text-secondary">{index + 1}</td>
                    <td className="fw-semibold">{employee.nik}</td>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>{employee.department}</td>
                    <td className="text-secondary">{employee.outlet}</td>
                    <td className="text-center">{total}</td>
                    <td className="text-center">
                      {done}/{total}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
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
                        <button
                          type="button"
                          className="btn-brand btn-brand-sm"
                          onClick={() => setAssignTo(employee)}
                        >
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            aria-hidden="true"
                          >
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                          Assign
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-4 empty-text">
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

      <AssignTestModal
        open={assignTo !== null}
        employeeName={assignTo?.name}
        onClose={() => setAssignTo(null)}
      />
    </>
  );
}

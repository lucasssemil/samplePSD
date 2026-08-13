"use client";

import { useMemo, useState } from "react";
import type { EmployeeRow } from "../lib/employees";

type Props = {
  employees: EmployeeRow[];
};

export function Assessment360List({ employees }: Props) {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter((employee) =>
      [
        employee.nik,
        employee.name,
        employee.position,
        employee.department,
        employee.outlet,
      ]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [employees, query]);

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">360 Assessment</h1>
          <p className="page-sub">Employee list for 360 assessment</p>
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
                <th>Outlet</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((employee, index) => (
                <tr key={employee.id}>
                  <td className="text-secondary">{index + 1}</td>
                  <td className="fw-semibold">{employee.nik}</td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td>{employee.department}</td>
                  <td className="text-secondary">{employee.outlet}</td>
                </tr>
              ))}

              {rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 empty-text">
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

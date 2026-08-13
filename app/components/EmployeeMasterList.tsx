"use client";

import { useMemo, useState } from "react";
import { EmployeeEditModal, type EmployeeProfile } from "./EmployeeEditModal";
import {
  finishedTrainings,
  levelOf,
  type EmployeeRow,
} from "../lib/employees";

type Props = {
  employees: EmployeeRow[];
  onSaveProfile: (id: string, profile: EmployeeProfile) => void;
};

export function EmployeeMasterList({ employees, onSaveProfile }: Props) {
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<EmployeeRow | null>(null);

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter((employee) =>
      [employee.nik, employee.name, employee.position]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [employees, query]);

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Employee Master</h1>
          <p className="page-sub">Profil dan data pribadi karyawan</p>
        </div>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Daftar Karyawan</h2>
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
              placeholder="Cari karyawan..."
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
                <th>Nomor Karyawan</th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th className="text-center">Level</th>
                <th>Status</th>
                <th className="text-center" style={{ width: 120 }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((employee, index) => {
                const level = levelOf(finishedTrainings(employee));
                return (
                <tr key={employee.id}>
                  <td className="text-secondary">{index + 1}</td>
                  <td className="fw-semibold">{employee.nik}</td>
                  <td>{employee.name}</td>
                  <td>{employee.position}</td>
                  <td className="text-center">
                    <span className="badge-status badge-level">
                      Lv {level.level} &middot; {level.name}
                    </span>
                  </td>
                  <td>
                    <span
                      className={
                        employee.active
                          ? "badge-status badge-published"
                          : "badge-status badge-archived"
                      }
                    >
                      {employee.active ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn-ghost btn-ghost-sm"
                        onClick={() => setEditing(employee)}
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
                          <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
                          <path d="m14.5 5.5 4 4" />
                        </svg>
                        Ubah
                      </button>
                    </div>
                  </td>
                </tr>
                );
              })}

              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 empty-text">
                    Tidak ada karyawan yang cocok dengan &ldquo;{query}&rdquo;.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="panel-foot">
          <span className="text-secondary">
            Menampilkan {rows.length} dari {employees.length} karyawan
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

      <EmployeeEditModal
        open={editing !== null}
        employee={editing}
        onClose={() => setEditing(null)}
        onSave={onSaveProfile}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import { KpiMinimumModal } from "./KpiMinimumModal";
import { kpiBand, kpiBandClass, type EmployeeRow } from "../lib/employees";
import type { KpiMinimum } from "../lib/kpiMinimum";

type Props = {
  employees: EmployeeRow[];
  minimums: KpiMinimum[];
  onSave: (level: KpiMinimum["level"], minScore: number) => void;
};

export function AssessmentMaster({ employees, minimums, onSave }: Props) {
  const [editing, setEditing] = useState<KpiMinimum | null>(null);

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Assessment Master</h1>
          <p className="page-sub">
            Tentukan minimum skor KPI untuk setiap level staf
          </p>
        </div>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Minimum KPI per Level</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Klik Ubah untuk mengganti angkanya
          </span>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0 data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th>Level Staf</th>
                <th>Keterangan</th>
                <th className="text-center">Minimum KPI</th>
                <th className="text-center">Jumlah Karyawan</th>
                <th className="text-center">Memenuhi</th>
                <th className="text-center" style={{ width: 120 }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {minimums.map((item, index) => {
                const staff = employees.filter(
                  (employee) => employee.staffLevel === item.level
                );
                const passing = staff.filter(
                  (employee) => employee.kpiScore >= item.minScore
                ).length;
                return (
                  <tr key={item.level}>
                    <td className="text-secondary">{index + 1}</td>
                    <td className="fw-semibold">{item.level}</td>
                    <td className="text-secondary">{item.description}</td>
                    <td className="text-center">
                      <span className="min-score">{item.minScore}</span>
                    </td>
                    <td className="text-center">{staff.length}</td>
                    <td className="text-center">
                      {staff.length === 0 ? (
                        <span className="text-secondary">&mdash;</span>
                      ) : (
                        <span
                          className={
                            passing === staff.length
                              ? "badge-status badge-published"
                              : "badge-status badge-failed"
                          }
                        >
                          {passing}/{staff.length}
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className="btn-ghost btn-ghost-sm"
                          onClick={() => setEditing(item)}
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
            </tbody>
          </table>
        </div>

        <div className="panel-foot">
          <span className="text-secondary">
            {minimums.length} level staf
          </span>
        </div>
      </section>

      <section className="panel mt-4">
        <div className="panel-head">
          <h2 className="panel-title">Skor KPI Karyawan</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Dibandingkan dengan minimum level masing-masing
          </span>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0 data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th>Nomor Karyawan</th>
                <th>Nama</th>
                <th>Jabatan</th>
                <th>Level Staf</th>
                <th className="text-center">Minimum KPI</th>
                <th className="text-center">Skor KPI</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => {
                const min =
                  minimums.find((item) => item.level === employee.staffLevel)
                    ?.minScore ?? 0;
                const meets = employee.kpiScore >= min;
                return (
                  <tr key={employee.id}>
                    <td className="text-secondary">{index + 1}</td>
                    <td className="fw-semibold">{employee.nik}</td>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td>{employee.staffLevel}</td>
                    <td className="text-center text-secondary">{min}</td>
                    <td className="text-center fw-semibold">
                      {employee.kpiScore}
                    </td>
                    <td>
                      <span className="d-inline-flex align-items-center gap-2">
                        <span
                          className={
                            meets
                              ? "badge-status badge-published"
                              : "badge-status badge-failed"
                          }
                        >
                          {meets ? "Memenuhi" : "Di bawah minimum"}
                        </span>
                        <span className={kpiBandClass(kpiBand(employee.kpiScore))}>
                          {kpiBand(employee.kpiScore)}
                        </span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <KpiMinimumModal
        open={editing !== null}
        item={editing}
        onClose={() => setEditing(null)}
        onSave={onSave}
      />
    </>
  );
}

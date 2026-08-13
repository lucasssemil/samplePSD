"use client";

import { useMemo, useState } from "react";
import { ApproveResignModal, type ApprovalPayload } from "./ApproveResignModal";
import { formatIsoDate, type EmployeeRow } from "../lib/employees";
import {
  categoryBreakdown,
  resignCategoryClass,
  resignStatusClass,
  type ResignLetter,
} from "../lib/resignations";

type Props = {
  employees: EmployeeRow[];
  letters: ResignLetter[];
  onApprove: (letterId: string, payload: ApprovalPayload) => void;
};

export function EmployeeExitList({ employees, letters, onApprove }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ResignLetter | null>(null);

  const nameOf = useMemo(
    () => new Map(employees.map((employee) => [employee.id, employee])),
    [employees]
  );

  const breakdown = categoryBreakdown(letters);
  const top = breakdown[0];

  const rows = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return letters;
    return letters.filter((letter) => {
      const employee = nameOf.get(letter.employeeId);
      return [employee?.nik, employee?.name, letter.category]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [letters, nameOf, query]);

  const pending = letters.filter((letter) => letter.status === "Menunggu").length;

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Employee Exit</h1>
          <p className="page-sub">
            Surat resign, exit interview, dan rencana onboarding
          </p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-lg-4">
          <div className="stat-card h-100">
            <span className="stat-label">Alasan Terbanyak</span>
            <span className="stat-value" style={{ fontSize: 20 }}>
              {top && top.employees > 0 ? top.category : "—"}
            </span>
            <span className="field-hint mt-0">
              {top && top.employees > 0
                ? `${top.employees} karyawan`
                : "Belum ada surat resign"}
            </span>
          </div>
        </div>

        {breakdown.map((item) => (
          <div className="col-6 col-lg-2" key={item.category}>
            <div className="stat-card h-100">
              <span className="stat-label">{item.category}</span>
              <span className="stat-value">{item.employees}</span>
              <span className="field-hint mt-0">
                karyawan
              </span>
            </div>
          </div>
        ))}

        <div className="col-6 col-lg-2">
          <div className="stat-card h-100">
            <span className="stat-label">Menunggu</span>
            <span className="stat-value">{pending}</span>
            <span className="field-hint mt-0">menunggu persetujuan</span>
          </div>
        </div>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Surat Resign</h2>
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
              placeholder="Cari surat..."
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
                <th>Kategori</th>
                <th>Tanggal Resign</th>
                <th>Dikirim</th>
                <th>Status</th>
                <th>Exit Interview</th>
                <th>Rencana Onboarding</th>
                <th className="text-center" style={{ width: 120 }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((letter, index) => {
                const employee = nameOf.get(letter.employeeId);
                return (
                  <tr key={letter.id}>
                    <td className="text-secondary">{index + 1}</td>
                    <td className="fw-semibold">{employee?.nik ?? "—"}</td>
                    <td>
                      {employee?.name ?? "Karyawan tidak dikenal"}
                      <span
                        className="d-block text-secondary"
                        style={{ fontSize: 12.5 }}
                      >
                        {employee?.position}
                      </span>
                    </td>
                    <td>
                      <span className={resignCategoryClass(letter.category)}>
                        {letter.category}
                      </span>
                    </td>
                    <td className="text-secondary">
                      {formatIsoDate(letter.resignDate)}
                    </td>
                    <td className="text-secondary">{letter.submittedAt}</td>
                    <td>
                      <span className={resignStatusClass(letter.status)}>
                        {letter.status}
                      </span>
                    </td>
                    <td className="text-secondary">
                      {letter.exitInterviewDate ? (
                        formatIsoDate(letter.exitInterviewDate)
                      ) : (
                        <span className="empty-text">Belum diatur</span>
                      )}
                    </td>
                    <td className="text-secondary">
                      {letter.onboardingPlanDate ? (
                        formatIsoDate(letter.onboardingPlanDate)
                      ) : (
                        <span className="empty-text">Belum diatur</span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className={
                            letter.status === "Disetujui"
                              ? "btn-ghost btn-ghost-sm"
                              : "btn-brand btn-brand-sm"
                          }
                          onClick={() => setSelected(letter)}
                        >
                          {letter.status === "Disetujui" ? "Tinjau" : "Setujui"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-4 empty-text">
                    {letters.length === 0
                      ? "Belum ada surat resign yang masuk."
                      : `Tidak ada surat yang cocok dengan "${query}".`}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="panel-foot">
          <span className="text-secondary">
            Menampilkan {rows.length} dari {letters.length} surat resign
          </span>
        </div>
      </section>

      <ApproveResignModal
        open={selected !== null}
        letter={selected}
        employeeName={
          selected
            ? nameOf.get(selected.employeeId)?.name ?? "Karyawan tidak dikenal"
            : ""
        }
        onClose={() => setSelected(null)}
        onApprove={onApprove}
      />
    </>
  );
}

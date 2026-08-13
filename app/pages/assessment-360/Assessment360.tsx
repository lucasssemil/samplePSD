"use client";

import { useMemo, useState } from "react";
import {
  AssessmentFormModal,
  type AssessmentSubmission,
} from "./AssessmentFormModal";
import { LineChart, type Point } from "../../components/LineChart";
import {
  ASSESSMENT_CATEGORIES,
  formatMonth,
  overallScore,
  reviewsOf,
  shortMonth,
  type AssessmentEntry,
} from "../../lib/assessments";
import { kpiBand, kpiBandClass, type EmployeeRow } from "../../lib/employees";
import { minimumFor, type KpiMinimum } from "../../lib/kpiMinimum";

const TODAY = "13 Agu 2026";

type Props = {
  /** The employees this account may review. */
  employees: EmployeeRow[];
  reviews: AssessmentEntry[];
  minimums: KpiMinimum[];
  onAdd: (employeeId: string, submission: AssessmentSubmission) => void;
};

export function Assessment360({ employees, reviews, minimums, onAdd }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [query, setQuery] = useState("");

  const employee = employees.find((item) => item.id === selectedId);

  const listRows = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter((item) =>
      [item.nik, item.name, item.position, item.staffLevel]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [employees, query]);

  if (!employee) {
    return (
      <>
        <div className="page-head">
          <div>
            <h1 className="page-title">360 Assessment</h1>
            <p className="page-sub">
              Pilih karyawan yang Anda supervisi untuk melihat penilaiannya
            </p>
          </div>
        </div>

        <section className="panel">
          <div className="panel-head">
            <h2 className="panel-title">Karyawan yang Disupervisi</h2>
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
                  <th>Level Staf</th>
                  <th className="text-center">Review</th>
                  <th>Review Terakhir</th>
                  <th className="text-center">Skor KPI</th>
                  <th className="text-center" style={{ width: 120 }}>
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {listRows.map((item, index) => {
                  const rows = reviewsOf(item.id, reviews);
                  const last = rows[rows.length - 1];
                  const band = kpiBand(item.kpiScore);
                  return (
                    <tr key={item.id}>
                      <td className="text-secondary">{index + 1}</td>
                      <td className="fw-semibold">{item.nik}</td>
                      <td>{item.name}</td>
                      <td>{item.position}</td>
                      <td>{item.staffLevel}</td>
                      <td className="text-center">{rows.length}</td>
                      <td className="text-secondary">
                        {last ? (
                          formatMonth(last.month)
                        ) : (
                          <span className="empty-text">Belum ada</span>
                        )}
                      </td>
                      <td className="text-center">
                        <span className={kpiBandClass(band)}>
                          {item.kpiScore}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn-brand btn-brand-sm"
                            onClick={() => setSelectedId(item.id)}
                          >
                            Pilih
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {listRows.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4 empty-text">
                      {employees.length === 0
                        ? "Belum ada karyawan yang Anda supervisi."
                        : `Tidak ada karyawan yang cocok dengan "${query}".`}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="panel-foot">
            <span className="text-secondary">
              Menampilkan {listRows.length} dari {employees.length} karyawan
            </span>
          </div>
        </section>
      </>
    );
  }

  const rows = reviewsOf(employee.id, reviews);
  const latest = rows[rows.length - 1];
  const minScore = minimumFor(minimums, employee.staffLevel);

  const points: Point[] = rows.map((entry) => ({
    key: entry.id,
    label: shortMonth(entry.month),
    value: entry.score,
    tooltip: `${formatMonth(entry.month)}: ${entry.score}`,
  }));

  return (
    <>
      <div className="page-head">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn-back"
            onClick={() => setSelectedId(null)}
            aria-label="Kembali ke daftar karyawan"
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
              {employee.staffLevel} &middot; minimum KPI {minScore}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="btn-brand"
          onClick={() => setFormOpen(true)}
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
          Tambah Review Bulanan
        </button>
      </div>

      {latest ? (
        <div className="row g-3 mb-4">
          {ASSESSMENT_CATEGORIES.map((category) => (
            <div className="col-6 col-lg" key={category.key}>
              <div className="stat-card h-100">
                <span className="stat-label">{category.label}</span>
                <span className="stat-value">{latest.scores[category.key]}</span>
                <span className="field-hint mt-0">
                  {formatMonth(latest.month)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">Skor KPI per Bulan</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Rata-rata lima kategori pada setiap bulan yang diinput
          </span>
        </div>
        <div className="panel-body">
          <LineChart points={points} />
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Riwayat Review</h2>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0 data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th>Bulan</th>
                {ASSESSMENT_CATEGORIES.map((category) => (
                  <th className="text-center" key={category.key}>
                    {category.short}
                  </th>
                ))}
                <th className="text-center">Skor KPI</th>
                <th>Status</th>
                <th>Diinput</th>
                <th>Catatan</th>
              </tr>
            </thead>
            <tbody>
              {[...rows].reverse().map((entry, index) => {
                const band = kpiBand(entry.score);
                return (
                  <tr key={entry.id}>
                    <td className="text-secondary">{index + 1}</td>
                    <td className="fw-semibold">{formatMonth(entry.month)}</td>
                    {ASSESSMENT_CATEGORIES.map((category) => (
                      <td className="text-center" key={category.key}>
                        {entry.scores[category.key]}
                      </td>
                    ))}
                    <td className="text-center fw-semibold">{entry.score}</td>
                    <td>
                      <span className="d-inline-flex align-items-center gap-2">
                        <span className={kpiBandClass(band)}>{band}</span>
                        {entry.score < minScore ? (
                          <span className="badge-status badge-failed">
                            Di bawah minimum
                          </span>
                        ) : null}
                      </span>
                    </td>
                    <td className="text-secondary">{entry.submittedAt}</td>
                    <td className="survey-notes">
                      {entry.notes || <span className="empty-text">—</span>}
                    </td>
                  </tr>
                );
              })}

              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={ASSESSMENT_CATEGORIES.length + 6}
                    className="text-center py-4 empty-text"
                  >
                    Belum ada review untuk karyawan ini.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        <div className="panel-foot">
          <span className="text-secondary">{rows.length} review diinput</span>
        </div>
      </section>

      <AssessmentFormModal
        open={formOpen}
        subtitle={`Review bulanan untuk ${employee.name}`}
        takenMonths={rows.map((entry) => entry.month)}
        onClose={() => setFormOpen(false)}
        onSubmit={(submission) => onAdd(employee.id, submission)}
      />
    </>
  );
}

export function buildReview(
  employeeId: string,
  submission: AssessmentSubmission
): AssessmentEntry {
  return {
    id: `as-${Date.now()}`,
    employeeId,
    month: submission.month,
    scores: submission.scores,
    score: overallScore(submission.scores),
    notes: submission.notes,
    submittedAt: TODAY,
  };
}

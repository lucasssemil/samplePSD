"use client";

import { useState } from "react";
import { Icon } from "../../components/icons";
import { ResignFormModal, type ResignSubmission } from "./ResignFormModal";
import {
  CURRENT_MONTH,
  formatMonth,
  type AssessmentEntry,
} from "../../lib/assessments";
import {
  finishedTrainings,
  formatIsoDate,
  levelOf,
  trainingState,
  type EmployeeRow,
} from "../../lib/employees";
import { ROLE_SUBTITLE, type Role } from "../../lib/menu";

type Props = {
  role: Role;
  employee: EmployeeRow | undefined;
  /** Employees this account supervises — empty for a plain employee. */
  team: EmployeeRow[];
  reviews: AssessmentEntry[];
  onOpen: (menuId: string) => void;
  onSubmitResign: (submission: ResignSubmission) => void;
};

/** Extra pintasan a supervisor gets on top of the employee ones. */
const SUPERVISOR_SHORTCUTS = [
  {
    id: "employee-training",
    icon: "training" as const,
    label: "Employee Training",
    text: "Tugaskan tes dan pantau hasil tim Anda",
  },
  {
    id: "assessment-360",
    icon: "assessment" as const,
    label: "360 Assessment",
    text: "Input review bulanan dan pantau skor KPI",
  },
];

export function UserDashboard({
  role,
  employee,
  team,
  reviews,
  onOpen,
  onSubmitResign,
}: Props) {
  const [resignOpen, setResignOpen] = useState(false);
  const [resign, setResign] = useState<ResignSubmission | null>(null);

  const assigned = employee?.assigned ?? [];
  const finished = employee ? finishedTrainings(employee) : 0;
  const level = levelOf(finished);

  const span = level.next ? level.next.min - level.min : 1;
  const progress = level.next
    ? Math.min(100, Math.round(((finished - level.min) / span) * 100))
    : 100;

  // Team members who still have a test to finish, and those with no 360
  // review for the current month yet.
  const testPending = team.filter((member) =>
    member.assigned.some((item) => trainingState(item) !== "Selesai")
  );
  const reviewPending = team.filter(
    (member) =>
      !reviews.some(
        (entry) =>
          entry.employeeId === member.id && entry.month === CURRENT_MONTH
      )
  );

  function submitResign(submission: ResignSubmission) {
    setResign(submission);
    onSubmitResign(submission);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">
            {employee
              ? `Selamat datang kembali, ${employee.name}`
              : ROLE_SUBTITLE[role]}
          </p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <div className="stat-card h-100">
            <span className="stat-label">Pelatihan Ditugaskan</span>
            <span className="stat-value">{assigned.length}</span>
            <span className="field-hint mt-0">
              Tes yang diberikan admin kepada Anda
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="stat-card h-100">
            <span className="stat-label">Pelatihan Selesai</span>
            <span className="stat-value">{finished}</span>
            <span className="field-hint mt-0">Post-test sudah dikumpulkan</span>
          </div>
        </div>
      </div>

      {role === "supervisor" ? (
        <>
          {reviewPending.length > 0 ? (
            <div className="alert-card mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3.8 21 19.5H3L12 3.8Z" />
                <path d="M12 10v4M12 17h.01" />
              </svg>
              <div className="alert-text">
                <strong>
                  {reviewPending.length} karyawan belum diisi 360 Assessment
                </strong>{" "}
                untuk bulan {formatMonth(CURRENT_MONTH)}:{" "}
                {reviewPending.map((member) => member.name).join(", ")}.
              </div>
              <button
                type="button"
                className="btn-brand btn-brand-sm"
                onClick={() => onOpen("assessment-360")}
              >
                Isi Sekarang
              </button>
            </div>
          ) : null}

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="stat-card h-100">
                <span className="stat-label">Karyawan Disupervisi</span>
                <span className="stat-value">{team.length}</span>
                <span className="field-hint mt-0">Anggota tim Anda</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card h-100">
                <span className="stat-label">Belum Selesai Tes</span>
                <span className="stat-value">{testPending.length}</span>
                <span className="field-hint mt-0">
                  Karyawan yang masih punya tes berjalan
                </span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card h-100">
                <span className="stat-label">Belum Direview</span>
                <span className="stat-value">{reviewPending.length}</span>
                <span className="field-hint mt-0">
                  Belum ada 360 Assessment bulan ini
                </span>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">Level Pelatihan</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Level naik seiring pelatihan yang Anda selesaikan
          </span>
        </div>
        <div className="panel-body">
          <div className="level-row">
            <span className="level-badge">
              <span className="level-number">{level.level}</span>
              <span className="level-name">{level.name}</span>
            </span>

            <div className="level-progress">
              <div className="d-flex justify-content-between mb-2">
                <span className="level-caption">
                  {level.next ? (
                    <>
                      <strong>{level.remaining} pelatihan lagi</strong> menuju
                      Level {level.next.level} &mdash; {level.next.name}
                    </>
                  ) : (
                    <strong>Level tertinggi sudah tercapai</strong>
                  )}
                </span>
                <span className="level-caption text-secondary">
                  {finished}
                  {level.next ? `/${level.next.min}` : ""} pelatihan
                </span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Pintasan</h2>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            <div className="col-md-6">
              <button
                type="button"
                className="shortcut-card shortcut-primary"
                onClick={() => setResignOpen(true)}
              >
                <span className="shortcut-icon">
                  <Icon name="report" size={22} />
                </span>
                <span className="shortcut-text">
                  <span className="shortcut-label">Form Resign</span>
                  <span className="shortcut-sub">
                    Ajukan permohonan pengunduran diri
                  </span>
                </span>
              </button>
            </div>

            <div className="col-md-6">
              <button
                type="button"
                className="shortcut-card"
                onClick={() => onOpen("survey")}
              >
                <span className="shortcut-icon">
                  <Icon name="survey" size={22} />
                </span>
                <span className="shortcut-text">
                  <span className="shortcut-label">Form Survei</span>
                  <span className="shortcut-sub">
                    Kirim masukan tentang perusahaan
                  </span>
                </span>
              </button>
            </div>
          </div>

          {role === "supervisor" ? (
            <div className="row g-3 mt-0">
              {SUPERVISOR_SHORTCUTS.map((shortcut) => (
                <div className="col-md-6" key={shortcut.id}>
                  <button
                    type="button"
                    className="shortcut-card"
                    onClick={() => onOpen(shortcut.id)}
                  >
                    <span className="shortcut-icon">
                      <Icon name={shortcut.icon} size={22} />
                    </span>
                    <span className="shortcut-text">
                      <span className="shortcut-label">{shortcut.label}</span>
                      <span className="shortcut-sub">{shortcut.text}</span>
                    </span>
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          {resign ? (
            <div className="notice-card mt-3">
              <span className="badge-status badge-draft">
                Form resign terkirim
              </span>
              <p className="mb-1 mt-2">
                <strong>{resign.category}</strong> &middot; tanggal resign{" "}
                {formatIsoDate(resign.resignDate)}
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

"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { ResignFormModal, type ResignSubmission } from "./ResignFormModal";
import {
  finishedTrainings,
  formatIsoDate,
  levelOf,
  type EmployeeRow,
} from "../lib/employees";
import { ROLE_SUBTITLE, type Role } from "../lib/menu";

type Props = {
  role: Role;
  employee: EmployeeRow | undefined;
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

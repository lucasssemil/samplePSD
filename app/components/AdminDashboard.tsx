"use client";

import { Icon } from "./icons";
import { kpiBand, type EmployeeRow, type KpiBand } from "../lib/employees";
import { ROLE_SUBTITLE, type Role } from "../lib/menu";
import { SURVEY_ENTRIES } from "../lib/surveys";

type Props = {
  role: Role;
  employees: EmployeeRow[];
  onOpen: (menuId: string) => void;
};

const SHORTCUTS = [
  {
    id: "employee-report",
    icon: "report" as const,
    label: "Employee Report",
    text: "Sebaran KPI dan ringkasan survei perusahaan",
    primary: true,
    roles: ["admin"] as Role[],
  },
  {
    id: "assessment-master",
    icon: "assessment" as const,
    label: "Assessment Master",
    text: "Atur minimum skor KPI tiap level staf",
    primary: false,
    roles: ["admin"] as Role[],
  },
  {
    id: "assessment-360",
    icon: "assessment" as const,
    label: "360 Assessment",
    text: "Input review bulanan dan pantau skor KPI karyawan",
    primary: false,
    roles: ["admin", "supervisor"] as Role[],
  },
  {
    id: "employee-training",
    icon: "training" as const,
    label: "Employee Training",
    text: "Tugaskan tes dan pantau hasil pre/post-test",
    primary: false,
    roles: ["admin", "supervisor"] as Role[],
  },
  {
    id: "lms",
    icon: "lms" as const,
    label: "LMS",
    text: "Kelola tes dan materi penilaian",
    primary: false,
    roles: ["admin"] as Role[],
  },
  {
    id: "survey",
    icon: "survey" as const,
    label: "Employee Company Survey",
    text: "Baca masukan karyawan per kategori",
    primary: false,
    roles: ["admin"] as Role[],
  },
];

export function AdminDashboard({ role, employees, onOpen }: Props) {
  const counts: Record<KpiBand, number> = { Hijau: 0, Kuning: 0, Merah: 0 };
  for (const employee of employees) counts[kpiBand(employee.kpiScore)] += 1;

  const negative = SURVEY_ENTRIES.filter(
    (entry) => entry.sentiment === "Negatif"
  ).length;

  const shortcuts = SHORTCUTS.filter((shortcut) =>
    shortcut.roles.includes(role)
  );

  const stats =
    role === "admin"
      ? [
          { label: "Karyawan", value: employees.length },
          { label: "KPI Hijau", value: counts.Hijau },
          { label: "KPI Kuning", value: counts.Kuning },
          { label: "KPI Merah", value: counts.Merah },
          { label: "Entri Survei", value: SURVEY_ENTRIES.length },
          { label: "Survei Negatif", value: negative },
        ]
      : [
          { label: "Karyawan", value: employees.length },
          { label: "KPI Hijau", value: counts.Hijau },
          { label: "KPI Kuning", value: counts.Kuning },
          { label: "KPI Merah", value: counts.Merah },
        ];

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">{ROLE_SUBTITLE[role]}</p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((stat) => (
          <div
            className={role === "admin" ? "col-6 col-lg-2" : "col-6 col-lg-3"}
            key={stat.label}
          >
            <div className="stat-card">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Pintasan</h2>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            {shortcuts.map((shortcut) => (
              <div
                className={shortcut.primary ? "col-12" : "col-md-4"}
                key={shortcut.id}
              >
                <button
                  type="button"
                  className={`shortcut-card${
                    shortcut.primary ? " shortcut-primary" : ""
                  }`}
                  onClick={() => onOpen(shortcut.id)}
                >
                  <span className="shortcut-icon">
                    <Icon name={shortcut.icon} size={22} />
                  </span>
                  <span className="shortcut-text">
                    <span className="shortcut-label">{shortcut.label}</span>
                    <span className="shortcut-sub">{shortcut.text}</span>
                  </span>
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
                    className="shortcut-arrow"
                  >
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

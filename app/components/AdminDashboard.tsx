"use client";

import { Icon } from "./icons";
import { kpiBand, type EmployeeRow, type KpiBand } from "../lib/employees";
import { SURVEY_ENTRIES } from "../lib/surveys";

type Props = {
  employees: EmployeeRow[];
  onOpen: (menuId: string) => void;
};

const SHORTCUTS = [
  {
    id: "employee-report",
    icon: "report" as const,
    label: "Employee Report",
    text: "KPI distribution and company survey summary",
    primary: true,
  },
  {
    id: "employee-training",
    icon: "training" as const,
    label: "Employee Training",
    text: "Assign tests and track pre/post-test results",
    primary: false,
  },
  {
    id: "lms",
    icon: "lms" as const,
    label: "LMS",
    text: "Manage tests and assessment materials",
    primary: false,
  },
  {
    id: "survey",
    icon: "survey" as const,
    label: "Employee Company Survey",
    text: "Read what employees reported per category",
    primary: false,
  },
];

export function AdminDashboard({ employees, onOpen }: Props) {
  const counts: Record<KpiBand, number> = { Green: 0, Yellow: 0, Red: 0 };
  for (const employee of employees) counts[kpiBand(employee.kpiScore)] += 1;

  const negative = SURVEY_ENTRIES.filter(
    (entry) => entry.sentiment === "Negative"
  ).length;

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">Admin workspace</p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: "Employees", value: employees.length },
          { label: "KPI Green", value: counts.Green },
          { label: "KPI Yellow", value: counts.Yellow },
          { label: "KPI Red", value: counts.Red },
          { label: "Survey Entries", value: SURVEY_ENTRIES.length },
          { label: "Negative Survey", value: negative },
        ].map((stat) => (
          <div className="col-6 col-lg-2" key={stat.label}>
            <div className="stat-card">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Shortcut</h2>
        </div>
        <div className="panel-body">
          <div className="row g-3">
            {SHORTCUTS.map((shortcut) => (
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

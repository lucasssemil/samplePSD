"use client";

import { useMemo } from "react";
import { PieChart, type Slice } from "./PieChart";
import {
  KPI_BANDS,
  kpiBand,
  kpiBandClass,
  type EmployeeRow,
  type KpiBand,
} from "../lib/employees";
import {
  SURVEY_CATEGORIES,
  SURVEY_ENTRIES,
  surveyCategoryClass,
} from "../lib/surveys";

type Props = {
  employees: EmployeeRow[];
};

/** Status palette — reserved for state, never reused as a series colour. */
const BAND_COLOR: Record<KpiBand, string> = {
  Green: "#0ca30c",
  Yellow: "#fab219",
  Red: "#d03b3b",
};

function BandIcon({ band }: { band: KpiBand }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke={BAND_COLOR[band]}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {band === "Green" ? (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12.5 2.7 2.7L16 9.8" />
        </>
      ) : band === "Yellow" ? (
        <>
          <path d="M12 3.8 21 19.5H3L12 3.8Z" />
          <path d="M12 10v4M12 17h.01" />
        </>
      ) : (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7.5v5M12 16h.01" />
        </>
      )}
    </svg>
  );
}

export function EmployeeReport({ employees }: Props) {
  const kpi = useMemo(() => {
    const counts: Record<KpiBand, number> = { Green: 0, Yellow: 0, Red: 0 };
    for (const employee of employees) counts[kpiBand(employee.kpiScore)] += 1;
    return counts;
  }, [employees]);

  const slices: Slice[] = KPI_BANDS.map((band) => ({
    key: band.band,
    label: band.band,
    value: kpi[band.band],
    color: BAND_COLOR[band.band],
  }));

  const byName = useMemo(
    () => new Map(employees.map((employee) => [employee.id, employee])),
    [employees]
  );

  const positive = SURVEY_ENTRIES.filter(
    (entry) => entry.sentiment === "Positive"
  );
  const negative = SURVEY_ENTRIES.filter(
    (entry) => entry.sentiment === "Negative"
  );

  const categoryCounts = SURVEY_CATEGORIES.map((category) => ({
    category,
    count: SURVEY_ENTRIES.filter((entry) => entry.category === category).length,
  })).sort((a, b) => b.count - a.count);

  const topCategory = categoryCounts[0];
  const maxCount = topCategory?.count ?? 0;

  function renderSentimentList(
    entries: typeof SURVEY_ENTRIES,
    tone: "positive" | "negative"
  ) {
    if (entries.length === 0) {
      return <p className="empty-text mb-0">No survey in this group.</p>;
    }
    return (
      <ul className="sentiment-list">
        {entries.map((entry) => (
          <li key={entry.id} className={`sentiment-item sentiment-${tone}`}>
            <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
              <span className="sentiment-name">
                {byName.get(entry.employeeId)?.name ?? "Unknown employee"}
              </span>
              <span className={surveyCategoryClass(entry.category)}>
                {entry.category}
              </span>
              <span className="score-date">{entry.submittedAt}</span>
            </div>
            <p className="sentiment-note mb-0">{entry.notes}</p>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Employee Report</h1>
          <p className="page-sub">
            KPI distribution and company survey summary
          </p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: "Employees", value: employees.length },
          { label: "Survey Entries", value: SURVEY_ENTRIES.length },
          { label: "Positive Survey", value: positive.length },
          { label: "Negative Survey", value: negative.length },
        ].map((stat) => (
          <div className="col-6 col-lg-3" key={stat.label}>
            <div className="stat-card">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <section className="panel h-100">
            <div className="panel-head">
              <h2 className="panel-title">KPI Score Distribution</h2>
            </div>
            <div className="panel-body">
              <div className="chart-row">
                <PieChart
                  slices={slices}
                  centerValue={employees.length}
                  centerLabel="Employees"
                />

                <ul className="chart-legend">
                  {KPI_BANDS.map((band) => {
                    const count = kpi[band.band];
                    const share =
                      employees.length === 0
                        ? 0
                        : Math.round((count / employees.length) * 100);
                    return (
                      <li key={band.band}>
                        <BandIcon band={band.band} />
                        <span className="legend-label">
                          {band.label}
                          <span className="legend-range">{band.range}</span>
                        </span>
                        <span className="legend-value">
                          {count}
                          <span className="legend-share">{share}%</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>
        </div>

        <div className="col-lg-6">
          <section className="panel h-100">
            <div className="panel-head">
              <h2 className="panel-title">Survey Category</h2>
              {topCategory ? (
                <span className="text-secondary" style={{ fontSize: 13.5 }}>
                  Most reported: <strong>{topCategory.category}</strong>
                </span>
              ) : null}
            </div>
            <div className="panel-body">
              <ul className="bar-list">
                {categoryCounts.map((item) => (
                  <li key={item.category}>
                    <div className="bar-head">
                      <span>{item.category}</span>
                      <span className="bar-value">{item.count}</span>
                    </div>
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${
                            maxCount === 0 ? 0 : (item.count / maxCount) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="field-hint">
                Number of survey entries submitted per category.
              </p>
            </div>
          </section>
        </div>
      </div>

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">KPI Score per Employee</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            The table behind the chart above
          </span>
        </div>
        <div className="table-responsive">
          <table className="table align-middle mb-0 data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th>Employee Number</th>
                <th>Name</th>
                <th>Position</th>
                <th className="text-center">KPI Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => {
                const band = kpiBand(employee.kpiScore);
                return (
                  <tr key={employee.id}>
                    <td className="text-secondary">{index + 1}</td>
                    <td className="fw-semibold">{employee.nik}</td>
                    <td>{employee.name}</td>
                    <td>{employee.position}</td>
                    <td className="text-center fw-semibold">
                      {employee.kpiScore}
                    </td>
                    <td>
                      <span className="d-inline-flex align-items-center gap-2">
                        <BandIcon band={band} />
                        <span className={kpiBandClass(band)}>{band}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="row g-4">
        <div className="col-lg-6">
          <section className="panel h-100">
            <div className="panel-head">
              <h2 className="panel-title">Positive Survey</h2>
              <span className="badge-status badge-published">
                {positive.length} entries
              </span>
            </div>
            <div className="panel-body">
              {renderSentimentList(positive, "positive")}
            </div>
          </section>
        </div>

        <div className="col-lg-6">
          <section className="panel h-100">
            <div className="panel-head">
              <h2 className="panel-title">Negative Survey</h2>
              <span className="badge-status badge-failed">
                {negative.length} entries
              </span>
            </div>
            <div className="panel-body">
              {renderSentimentList(negative, "negative")}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

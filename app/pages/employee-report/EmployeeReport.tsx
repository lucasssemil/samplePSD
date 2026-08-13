"use client";

import { useMemo } from "react";
import { PieChart, type Slice } from "../../components/PieChart";
import {
  KPI_BANDS,
  kpiBand,
  kpiBandClass,
  type EmployeeRow,
  type KpiBand,
} from "../../lib/employees";
import {
  SURVEY_CATEGORIES,
  SURVEY_ENTRIES,
  surveyCategoryClass,
} from "../../lib/surveys";

type Props = {
  employees: EmployeeRow[];
};

/** Status palette — reserved for state, never reused as a series colour. */
const BAND_COLOR: Record<KpiBand, string> = {
  Hijau: "#0ca30c",
  Kuning: "#fab219",
  Merah: "#d03b3b",
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
      {band === "Hijau" ? (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12.5 2.7 2.7L16 9.8" />
        </>
      ) : band === "Kuning" ? (
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
    const counts: Record<KpiBand, number> = { Hijau: 0, Kuning: 0, Merah: 0 };
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
    (entry) => entry.sentiment === "Positif"
  );
  const negative = SURVEY_ENTRIES.filter(
    (entry) => entry.sentiment === "Negatif"
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
      return <p className="empty-text mb-0">Belum ada survei di kelompok ini.</p>;
    }
    return (
      <ul className="sentiment-list">
        {entries.map((entry) => (
          <li key={entry.id} className={`sentiment-item sentiment-${tone}`}>
            <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
              <span className="sentiment-name">
                {byName.get(entry.employeeId)?.name ?? "Karyawan tidak dikenal"}
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
            Sebaran KPI dan ringkasan survei perusahaan
          </p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {[
          { label: "Karyawan", value: employees.length },
          { label: "Entri Survei", value: SURVEY_ENTRIES.length },
          { label: "Survei Positif", value: positive.length },
          { label: "Survei Negatif", value: negative.length },
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
              <h2 className="panel-title">Sebaran Skor KPI</h2>
            </div>
            <div className="panel-body">
              <div className="chart-row">
                <PieChart
                  slices={slices}
                  centerValue={employees.length}
                  centerLabel="Karyawan"
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
              <h2 className="panel-title">Kategori Survei</h2>
              {topCategory ? (
                <span className="text-secondary" style={{ fontSize: 13.5 }}>
                  Paling banyak: <strong>{topCategory.category}</strong>
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
                Jumlah entri survei yang masuk per kategori.
              </p>
            </div>
          </section>
        </div>
      </div>

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">Skor KPI per Karyawan</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Tabel di balik grafik di atas
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
                <th className="text-center">Skor KPI</th>
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
              <h2 className="panel-title">Survei Positif</h2>
              <span className="badge-status badge-published">
                {positive.length} entri
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
              <h2 className="panel-title">Survei Negatif</h2>
              <span className="badge-status badge-failed">
                {negative.length} entri
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

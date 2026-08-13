"use client";

import {
  attemptStatusClass,
  trainingState,
  trainingStateClass,
  type AssignedTest,
  type EmployeeRow,
} from "../../lib/employees";

type Props = {
  employee: EmployeeRow | undefined;
  onOpen: (assignmentId: string) => void;
};

function TrainingTable({
  rows,
  emptyText,
  history,
  onOpen,
}: {
  rows: AssignedTest[];
  emptyText: string;
  history: boolean;
  onOpen?: (assignmentId: string) => void;
}) {
  return (
    <div className="table-responsive">
      <table className="table align-middle mb-0 data-table">
        <thead>
          <tr>
            <th style={{ width: 60 }}>No</th>
            <th>Kode Tes</th>
            <th>Judul Tes</th>
            <th>Tanggal Pelatihan</th>
            <th className="text-center">Wajib</th>
            <th>Pre-Test</th>
            <th>Post-Test</th>
            <th>{history ? "Hasil" : "Status"}</th>
            {onOpen ? <th style={{ width: 60 }}></th> : null}
          </tr>
        </thead>
        <tbody>
          {rows.map((item, index) => {
            const state = trainingState(item);
            return (
              <tr
                key={item.id}
                className={onOpen ? "row-clickable" : undefined}
                onClick={onOpen ? () => onOpen(item.id) : undefined}
              >
                <td className="text-secondary">{index + 1}</td>
                <td className="fw-semibold">{item.code}</td>
                <td>
                  {item.title}
                  <span
                    className="d-block text-secondary"
                    style={{ fontSize: 12.5 }}
                  >
                    {item.category}
                  </span>
                </td>
                <td className="text-secondary">
                  {item.trainingStart && item.trainingEnd ? (
                    `${item.trainingStart} — ${item.trainingEnd}`
                  ) : (
                    <span className="empty-text">Tanpa rentang tanggal</span>
                  )}
                </td>
                <td className="text-center">
                  <span
                    className={
                      item.required
                        ? "badge-status badge-required"
                        : "badge-status badge-archived"
                    }
                  >
                    {item.required ? "Wajib" : "Opsional"}
                  </span>
                </td>
                <td>
                  <span className={attemptStatusClass(item.preTest.status)}>
                    {item.preTest.status}
                  </span>
                  {item.preTest.score !== null ? (
                    <span className="score-date d-block">
                      Skor {item.preTest.score}
                    </span>
                  ) : null}
                </td>
                <td>
                  <span className={attemptStatusClass(item.postTest.status)}>
                    {item.postTest.status}
                  </span>
                  {item.postTest.score !== null ? (
                    <span className="score-date d-block">
                      Skor {item.postTest.score}
                    </span>
                  ) : null}
                </td>
                <td>
                  <span className={trainingStateClass(state)}>{state}</span>
                </td>
                {onOpen ? (
                  <td>
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label={`Buka ${item.title}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpen(item.id);
                      }}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 5 7 7-7 7" />
                      </svg>
                    </button>
                  </td>
                ) : null}
              </tr>
            );
          })}

          {rows.length === 0 ? (
            <tr>
              <td colSpan={onOpen ? 9 : 8} className="text-center py-4 empty-text">
                {emptyText}
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export function UserTraining({ employee, onOpen }: Props) {
  const assigned = employee?.assigned ?? [];
  const active = assigned.filter((item) => trainingState(item) === "Aktif");
  const history = assigned.filter((item) => trainingState(item) !== "Aktif");

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">Training</h1>
          <p className="page-sub">Tes yang ditugaskan kepada Anda dan riwayat pelatihan</p>
        </div>
      </div>

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">Pelatihan Aktif</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Klik salah satu pelatihan untuk membukanya
          </span>
        </div>
        <TrainingTable
          rows={active}
          history={false}
          onOpen={onOpen}
          emptyText="Tidak ada pelatihan aktif. Semua sudah Anda selesaikan."
        />
        <div className="panel-foot">
          <span className="text-secondary">{active.length} pelatihan aktif</span>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Riwayat Pelatihan</h2>
          <span className="text-secondary" style={{ fontSize: 13.5 }}>
            Pelatihan yang selesai dan kedaluwarsa
          </span>
        </div>
        <TrainingTable
          rows={history}
          history
          emptyText="Belum ada riwayat pelatihan."
        />
        <div className="panel-foot">
          <span className="text-secondary">
            {
              history.filter((item) => trainingState(item) === "Selesai")
                .length
            }{" "}
            selesai &middot;{" "}
            {history.filter((item) => trainingState(item) === "Kedaluwarsa").length}{" "}
            kedaluwarsa
          </span>
        </div>
      </section>
    </>
  );
}

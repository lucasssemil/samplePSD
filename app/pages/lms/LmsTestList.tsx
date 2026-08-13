"use client";

import { TEST_LIST, totalQuestions, type TestStatus } from "../../lib/tests";

type Props = {
  onCreate: () => void;
};

function statusClass(status: TestStatus) {
  if (status === "Terbit") return "badge-status badge-published";
  if (status === "Draft") return "badge-status badge-draft";
  return "badge-status badge-archived";
}

export function LmsTestList({ onCreate }: Props) {
  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">LMS</h1>
          <p className="page-sub">Kelola tes dan materi penilaian</p>
        </div>

        <button type="button" className="btn-brand" onClick={onCreate}>
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
          Buat Tes Baru
        </button>
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2 className="panel-title">Daftar Tes</h2>
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
            <input type="text" placeholder="Cari tes..." />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0 data-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th>Kode Tes</th>
                <th>Judul Tes</th>
                <th>Kategori</th>
                <th className="text-center">Soal</th>
                <th className="text-center">Video</th>
                <th className="text-center">Durasi</th>
                <th>Status</th>
                <th>Dibuat</th>
                <th className="text-center" style={{ width: 120 }}>
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {TEST_LIST.map((row, index) => (
                <tr key={row.id}>
                  <td className="text-secondary">{index + 1}</td>
                  <td className="fw-semibold">{row.code}</td>
                  <td>{row.title}</td>
                  <td>{row.category}</td>
                  <td className="text-center">
                    {totalQuestions(row)}
                    <span className="d-block text-secondary" style={{ fontSize: 12 }}>
                      {row.preQuestions} pre / {row.postQuestions} post
                    </span>
                  </td>
                  <td className="text-center">
                    <a
                      className="video-link"
                      href={row.videoLink}
                      target="_blank"
                      rel="noreferrer"
                      title={row.videoLink}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2.5" y="5" width="19" height="14" rx="3" />
                        <path d="m10 9.5 5 2.5-5 2.5v-5Z" />
                      </svg>
                      Video
                    </a>
                  </td>
                  <td className="text-center">{row.duration} mnt</td>
                  <td>
                    <span className={statusClass(row.status)}>{row.status}</span>
                  </td>
                  <td className="text-secondary">{row.createdAt}</td>
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <button type="button" className="icon-btn" title="Lihat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
                          <circle cx="12" cy="12" r="2.8" />
                        </svg>
                      </button>
                      <button type="button" className="icon-btn" title="Ubah">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 20h4L19 9l-4-4L4 16v4Z" />
                          <path d="m14.5 5.5 4 4" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="icon-btn icon-btn-danger"
                        title="Hapus"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 7h16M9.5 7V5h5v2M6.5 7l1 13h9l1-13" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel-foot">
          <span className="text-secondary">
            Menampilkan 1&ndash;{TEST_LIST.length} dari {TEST_LIST.length} tes
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0">
              <li className="page-item disabled">
                <span className="page-link">Sebelumnya</span>
              </li>
              <li className="page-item active">
                <span className="page-link">1</span>
              </li>
              <li className="page-item disabled">
                <span className="page-link">Berikutnya</span>
              </li>
            </ul>
          </nav>
        </div>
      </section>

    </>
  );
}

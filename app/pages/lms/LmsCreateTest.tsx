"use client";

import { useState } from "react";
import { FileDrop } from "../../components/FileDrop";
import { Field } from "../../components/FormField";
import { TEST_CATEGORIES } from "../../lib/tests";

type Props = {
  onBack: () => void;
};

type Phase = "pre" | "post";

type Question = {
  id: number;
  text: string;
  options: string[];
  answer: number | null;
  /** Disabled questions stay in the draft but are left out of the test. */
  enabled: boolean;
};

const LETTERS = ["A", "B", "C", "D"];

let nextQuestionId = 1;

function newQuestion(): Question {
  return {
    id: nextQuestionId++,
    text: "",
    options: ["", "", "", ""],
    answer: null,
    enabled: true,
  };
}

const PHASE_LABEL: Record<Phase, string> = {
  pre: "Pre-Test",
  post: "Post-Test",
};

const PHASE_HINT: Record<Phase, string> = {
  pre: "Dikerjakan sebelum karyawan menonton video pelatihan.",
  post: "Dikerjakan setelah video pelatihan untuk mengukur peningkatan.",
};

export function LmsCreateTest({ onBack }: Props) {
  const [phase, setPhase] = useState<Phase>("pre");
  const [videoLink, setVideoLink] = useState("");
  const [material, setMaterial] = useState<File | null>(null);
  const [questions, setQuestions] = useState<Record<Phase, Question[]>>({
    pre: [newQuestion()],
    post: [newQuestion()],
  });

  const active = questions[phase];

  function patchQuestion(id: number, patch: Partial<Question>) {
    setQuestions((current) => ({
      ...current,
      [phase]: current[phase].map((question) =>
        question.id === id ? { ...question, ...patch } : question
      ),
    }));
  }

  function addQuestion() {
    setQuestions((current) => ({
      ...current,
      [phase]: [...current[phase], newQuestion()],
    }));
  }

  function removeQuestion(id: number) {
    setQuestions((current) => ({
      ...current,
      [phase]: current[phase].filter((question) => question.id !== id),
    }));
  }

  // Only enabled questions with text count toward the test.
  const filled = (list: Question[]) =>
    list.filter((question) => question.enabled && question.text.trim() !== "")
      .length;

  const preFilled = filled(questions.pre);
  const postFilled = filled(questions.post);
  const videoValid = videoLink.trim() !== "";
  const canSave = preFilled > 0 && postFilled > 0 && videoValid;

  return (
    <>
      <div className="page-head">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn-back"
            onClick={onBack}
            aria-label="Kembali ke daftar tes"
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
            <h1 className="page-title">Buat Tes Baru</h1>
            <p className="page-sub">
              Setiap tes wajib memiliki pre-test, post-test, dan link video
            </p>
          </div>
        </div>
      </div>

      <section className="panel mb-4">
        <div className="panel-head">
          <h2 className="panel-title">Informasi Tes</h2>
        </div>

        <div className="panel-body">
          <div className="row g-3">
            <Field label="Judul Tes" required col="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Basic Food Safety & Hygiene"
              />
            </Field>

            <Field label="Kode Tes" required col="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="e.g. TST-007"
              />
            </Field>

            <Field label="Kategori" required col="col-md-6">
              <select className="form-select" defaultValue="">
                <option value="" disabled>
                  Pilih kategori
                </option>
                {TEST_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Durasi (menit)" col="col-md-3">
              <input type="number" className="form-control" placeholder="30" />
            </Field>

            <Field label="Nilai Minimal" col="col-md-3">
              <input type="number" className="form-control" placeholder="75" />
            </Field>

            <Field
              label="Link Video Pelatihan"
              required
              col="col-12"
              hint="Video yang ditonton karyawan di antara pre-test dan post-test."
            >
              <input
                type="url"
                className="form-control"
                placeholder="https://youtu.be/..."
                value={videoLink}
                onChange={(event) => setVideoLink(event.target.value)}
              />
            </Field>

            <Field
              label="File Materi"
              col="col-12"
              hint="Opsional — lampiran yang bisa diunduh karyawan di halaman pelatihan."
            >
              <FileDrop file={material} onPick={setMaterial} />
            </Field>

            <Field label="Deskripsi" col="col-12">
              <textarea
                className="form-control"
                rows={3}
                placeholder="Deskripsi singkat tentang tes ini..."
              />
            </Field>

            <Field label="Status" col="col-md-6">
              <select className="form-select" defaultValue="Draft">
                <option>Draft</option>
                <option>Terbit</option>
              </select>
            </Field>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div className="phase-tabs" role="tablist" aria-label="Tahap tes">
            {(["pre", "post"] as Phase[]).map((value) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={phase === value}
                className={`phase-tab${phase === value ? " active" : ""}`}
                onClick={() => setPhase(value)}
              >
                {PHASE_LABEL[value]}
                <span className="phase-count">
                  {value === "pre" ? preFilled : postFilled}
                </span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn-brand btn-brand-sm"
            onClick={addQuestion}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            Tambah Soal
          </button>
        </div>

        <div className="panel-body">
          <p className="field-hint mt-0 mb-3">{PHASE_HINT[phase]}</p>

          {active.map((question, index) => (
            <div
              className={`question-card mb-3${
                question.enabled ? "" : " question-card-off"
              }`}
              key={question.id}
            >
              <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
                <span className="question-index">
                  {PHASE_LABEL[phase]} &middot; Soal {index + 1}
                </span>
                <div className="d-flex align-items-center gap-2">
                  <div className="form-check form-switch question-switch">
                    <input
                      id={`q-${phase}-${question.id}-enabled`}
                      type="checkbox"
                      role="switch"
                      className="form-check-input mt-0"
                      checked={question.enabled}
                      onChange={(event) =>
                        patchQuestion(question.id, {
                          enabled: event.target.checked,
                        })
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`q-${phase}-${question.id}-enabled`}
                    >
                      {question.enabled ? "Aktif" : "Nonaktif"}
                    </label>
                  </div>

                  <span className="badge-status badge-draft">
                    Pilihan Ganda
                  </span>
                  <button
                    type="button"
                    className="icon-btn icon-btn-danger"
                    title="Hapus soal"
                    onClick={() => removeQuestion(question.id)}
                    disabled={active.length === 1}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 7h16M9.5 7V5h5v2M6.5 7l1 13h9l1-13" />
                    </svg>
                  </button>
                </div>
              </div>

              <input
                type="text"
                className="form-control mb-3"
                placeholder="Tulis pertanyaannya di sini..."
                disabled={!question.enabled}
                value={question.text}
                onChange={(event) =>
                  patchQuestion(question.id, { text: event.target.value })
                }
              />

              <div className="row g-2">
                {LETTERS.map((letter, optionIndex) => (
                  <div className="col-md-6" key={letter}>
                    <div className="option-row">
                      <input
                        type="radio"
                        name={`${phase}-${question.id}-answer`}
                        className="form-check-input mt-0"
                        aria-label={`Jawaban benar ${letter}`}
                        disabled={!question.enabled}
                        checked={question.answer === optionIndex}
                        onChange={() =>
                          patchQuestion(question.id, { answer: optionIndex })
                        }
                      />
                      <span className="option-letter">{letter}</span>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder={`Opsi ${letter}`}
                        disabled={!question.enabled}
                        value={question.options[optionIndex]}
                        onChange={(event) =>
                          patchQuestion(question.id, {
                            options: question.options.map((option, i) =>
                              i === optionIndex ? event.target.value : option
                            ),
                          })
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <p className="empty-text mb-0">
            Pilih radio button di samping jawaban yang benar.
          </p>
        </div>

        <div className="panel-foot flex-column align-items-stretch gap-3">
          <ul className="requirement-list">
            {[
              { label: "Minimal satu soal pre-test", ok: preFilled > 0 },
              { label: "Minimal satu soal post-test", ok: postFilled > 0 },
              { label: "Link video pelatihan", ok: videoValid },
            ].map((item) => (
              <li
                key={item.label}
                className={item.ok ? "requirement-ok" : "requirement-todo"}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {item.ok ? (
                    <path d="m5 12.5 4.5 4.5L19 7" />
                  ) : (
                    <circle cx="12" cy="12" r="7.5" />
                  )}
                </svg>
                {item.label}
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn-ghost" onClick={onBack}>
              Batal
            </button>
            <button type="button" className="btn-brand" disabled={!canSave}>
              Simpan Tes
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

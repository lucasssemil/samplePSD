"use client";

import { useEffect, useState } from "react";
import type { Question } from "../../lib/questions";

export type TestResult = {
  correct: number;
  total: number;
  score: number;
  passed: boolean;
};

type Props = {
  title: string;
  phaseLabel: string;
  questions: Question[];
  durationMinutes: number;
  passingScore: number;
  onFinish: (result: TestResult) => void;
  onCancel: () => void;
};

const LETTERS = ["A", "B", "C", "D"];

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function TestRunner({
  title,
  phaseLabel,
  questions,
  durationMinutes,
  passingScore,
  onFinish,
  onCancel,
}: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [remaining, setRemaining] = useState(durationMinutes * 60);

  const answered = Object.keys(answers).length;

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hand in automatically the moment the time limit runs out.
  useEffect(() => {
    if (remaining > 0) return;
    const correct = questions.filter(
      (question) => answers[question.id] === question.answer
    ).length;
    const score = Math.round((correct / questions.length) * 100);
    onFinish({
      correct,
      total: questions.length,
      score,
      passed: score >= passingScore,
    });
    // Only the timer hitting zero should trigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  function submit() {
    const correct = questions.filter(
      (question) => answers[question.id] === question.answer
    ).length;
    const score = Math.round((correct / questions.length) * 100);
    onFinish({
      correct,
      total: questions.length,
      score,
      passed: score >= passingScore,
    });
  }

  const low = remaining <= 60;

  return (
    <section className="panel">
      <div className="panel-head">
        <div>
          <h2 className="panel-title">
            {phaseLabel} &middot; {title}
          </h2>
          <p className="page-sub mt-1">
            {questions.length} soal pilihan ganda acak &middot; nilai minimal{" "}
            {passingScore}
          </p>
        </div>
        <span className={`quiz-timer${low ? " quiz-timer-low" : ""}`}>
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
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5v5l3 1.8" />
          </svg>
          {formatClock(remaining)}
        </span>
      </div>

      <div className="panel-body">
        {questions.map((question, index) => (
          <div className="question-card mb-3" key={question.id}>
            <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
              <span className="question-index">
                Soal {index + 1} dari {questions.length}
              </span>
              {answers[question.id] !== undefined ? (
                <span className="badge-status badge-published">Terjawab</span>
              ) : (
                <span className="badge-status badge-archived">Belum dijawab</span>
              )}
            </div>

            <p className="quiz-question">{question.text}</p>

            <div className="row g-2">
              {question.options.map((option, optionIndex) => (
                <div className="col-md-6" key={option}>
                  <label className="option-row option-choice">
                    <input
                      type="radio"
                      name={question.id}
                      className="form-check-input mt-0"
                      checked={answers[question.id] === optionIndex}
                      onChange={() =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: optionIndex,
                        }))
                      }
                    />
                    <span className="option-letter">
                      {LETTERS[optionIndex]}
                    </span>
                    <span className="option-text">{option}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="panel-foot">
        <span className="text-secondary">
          {answered} dari {questions.length} soal terjawab
        </span>
        <div className="d-flex gap-2">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Batal
          </button>
          <button
            type="button"
            className="btn-brand"
            onClick={submit}
            disabled={answered === 0}
          >
            Kumpulkan Jawaban
          </button>
        </div>
      </div>
    </section>
  );
}

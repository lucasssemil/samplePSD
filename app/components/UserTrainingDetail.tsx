"use client";

import { useState } from "react";
import { TestRunner, type TestResult } from "./TestRunner";
import {
  attemptStatusClass,
  trainingState,
  trainingStateClass,
  type AssignedTest,
} from "../lib/employees";
import { pickQuestions, type Question } from "../lib/questions";
import { TEST_LIST } from "../lib/tests";

type Props = {
  item: AssignedTest;
  onBack: () => void;
};

type Phase = "pre" | "post";

/** Placeholder training video — the real link comes from the test record. */
const VIDEO_ID = "RLfNgIDUnoE";

type Running = {
  phase: Phase;
  questions: Question[];
};

export function UserTrainingDetail({ item, onBack }: Props) {
  const [running, setRunning] = useState<Running | null>(null);
  const [results, setResults] = useState<Partial<Record<Phase, TestResult>>>({});

  const test = TEST_LIST.find((row) => row.id === item.testId);
  const duration = test?.duration ?? 30;
  const state = trainingState(item);

  function start(phase: Phase) {
    setRunning({ phase, questions: pickQuestions(10) });
  }

  function finish(result: TestResult) {
    if (!running) return;
    setResults((current) => ({ ...current, [running.phase]: result }));
    setRunning(null);
  }

  /** A finished attempt in this session wins over the seeded mock data. */
  function scoreOf(phase: Phase) {
    const fresh = results[phase];
    if (fresh) return fresh.score;
    const attempt = phase === "pre" ? item.preTest : item.postTest;
    return attempt.score;
  }

  function statusOf(phase: Phase) {
    const fresh = results[phase];
    if (fresh) return fresh.passed ? "Passed" : "Failed";
    return (phase === "pre" ? item.preTest : item.postTest).status;
  }

  const preDone = statusOf("pre") === "Passed" || statusOf("pre") === "Failed";

  return (
    <>
      <div className="page-head">
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn-back"
            onClick={onBack}
            aria-label="Back to training list"
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
            <h1 className="page-title">{item.title}</h1>
            <p className="page-sub">
              {item.code} &middot; {item.category} &middot;{" "}
              {item.trainingStart && item.trainingEnd
                ? `${item.trainingStart} — ${item.trainingEnd}`
                : "No date range"}
            </p>
          </div>
        </div>

        <span className={trainingStateClass(state)}>{state}</span>
      </div>

      {running ? (
        <TestRunner
          title={item.title}
          phaseLabel={running.phase === "pre" ? "Pre-Test" : "Post-Test"}
          questions={running.questions}
          durationMinutes={duration}
          passingScore={item.passingScore}
          onFinish={finish}
          onCancel={() => setRunning(null)}
        />
      ) : (
        <>
          <section className="panel mb-4">
            <div className="panel-head">
              <h2 className="panel-title">Training Video</h2>
              <span className="text-secondary" style={{ fontSize: 13.5 }}>
                Watch this before taking the post-test
              </span>
            </div>
            <div className="panel-body">
              <div className="video-frame">
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                  title={`Training video for ${item.title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>

          <div className="row g-3 mb-4">
            {(["pre", "post"] as Phase[]).map((phase) => {
              const score = scoreOf(phase);
              const status = statusOf(phase);
              const label = phase === "pre" ? "Pre-Test" : "Post-Test";
              const blocked = phase === "post" && !preDone;
              return (
                <div className="col-md-6" key={phase}>
                  <div className="stat-card h-100">
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <span className="stat-label">{label} Score</span>
                      <span className={attemptStatusClass(status)}>
                        {status}
                      </span>
                    </div>
                    <span className="stat-value">
                      {score === null ? "—" : score}
                      <span className="score-total">
                        /{item.passingScore} to pass
                      </span>
                    </span>
                    <span className="field-hint mt-0">
                      10 questions &middot; time limit {duration} minutes
                    </span>
                    <div className="mt-3">
                      <button
                        type="button"
                        className="btn-brand btn-brand-sm"
                        onClick={() => start(phase)}
                        disabled={blocked}
                      >
                        Do {label}
                      </button>
                      {blocked ? (
                        <p className="field-hint mb-0">
                          Finish the pre-test first.
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {results.pre || results.post ? (
            <section className="panel">
              <div className="panel-head">
                <h2 className="panel-title">Result This Session</h2>
              </div>
              <div className="panel-body">
                <ul className="sentiment-list">
                  {(["pre", "post"] as Phase[]).map((phase) => {
                    const result = results[phase];
                    if (!result) return null;
                    return (
                      <li
                        key={phase}
                        className={`sentiment-item sentiment-${
                          result.passed ? "positive" : "negative"
                        }`}
                      >
                        <div className="d-flex align-items-center gap-2 flex-wrap mb-1">
                          <span className="sentiment-name">
                            {phase === "pre" ? "Pre-Test" : "Post-Test"}
                          </span>
                          <span
                            className={
                              result.passed
                                ? "badge-status badge-published"
                                : "badge-status badge-failed"
                            }
                          >
                            {result.passed ? "Passed" : "Failed"}
                          </span>
                        </div>
                        <p className="sentiment-note mb-0">
                          {result.correct} of {result.total} correct &middot;
                          score {result.score} (passing {item.passingScore})
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </section>
          ) : null}
        </>
      )}
    </>
  );
}
